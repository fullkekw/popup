import './styles.scss';

import React, { createContext, FC, JSX, Suspense, useContext, useEffect, useMemo, useState } from "react";
import cn from 'classnames';
import { IPopupButtonProps, IPopupContextProps, IPopupLayerProps, IPopupNode, IPopupSettings, PopupWindowAnimationType, IPopupWindowProps } from './Interfaces';
import { createPortal } from 'react-dom';
import useMixedState from './useMixedState';



const DEFAULT_SETTINGS: Required<IPopupSettings> = {
  disableScroll: true,
  exitOnDocument: true,
  exitOnEscape: true,
  preventStateChange: false
};

const PopupContext = createContext<IPopupContextProps>({} as IPopupContextProps);



/** 
 * Popup context provider. Must be inside body tag and in client environment (NextJS)
 */
export const PopupLayer: FC<IPopupLayerProps> = ({ className, settings: initialSettings, children, ...props }) => {
  const [settings] = useState<IPopupSettings>(reassingObject(initialSettings ?? {}, DEFAULT_SETTINGS));
  const [nodes, setNodes] = useState<IPopupNode[]>([]);

  const context: IPopupContextProps = {
    nodes,
    toggleNode,
    registerNode,
    toggleDocument
  };



  // Handle exitOnEscape
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', handleKeydown);

    function handleKeydown(e: KeyboardEvent) {
      const key = e.key;

      if (key === 'Escape') {
        const maxZIndex = Math.max(...nodes.filter(el => el.open).map(el => el.zIndex));
        const node = nodes.find(el => el.open && el.zIndex === maxZIndex);
        if (!node || !node.settings.exitOnEscape || !settings?.exitOnEscape) return;

        toggleNode(node.id);
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [nodes]);


  /** 
   * @param state Forced state
   */
  function toggleNode(nod: string | IPopupNode, force?: boolean) {
    let node: IPopupNode;

    if (typeof nod === 'string') {
      node = { ...nodes.find(el => el.id === nod) } as IPopupNode;
    } else {
      node = { ...nod };
    }

    if (!node.id) return;
    if ((settings.preventStateChange || node.settings.preventStateChange) && force === undefined) return console.warn(`Popup action prevented`);

    const open = force ?? !node?.open;

    node.open = open;
    node.zIndex = open ? Math.max(...nodes.map(el => el.zIndex), 0) + 1 : 0;

    setNodes(prev => [...prev.filter(el => el.id !== node.id), node]);

    // Hide scroll on open
    if (settings.disableScroll && node.settings.disableScroll && open) {
      document.body.classList.add('fkw-popup--noScroll');
    }

    // Show scroll if no popup open
    if (!open && !nodes.filter(el => el.id !== node.id).some(el => el.open)) {
      document.body.classList.remove('fkw-popup--noScroll');
    }
  }

  /** Register new node */
  function registerNode(node: IPopupNode) {
    setNodes(prev => [...prev, node]);

    if (node.open) toggleNode(node, true);
  }

  function toggleDocument(id: string, e: React.MouseEvent) {
    const node: IPopupNode = { ...nodes.find(el => el.id === id) } as IPopupNode;
    if (!node.id) return;
    if (!node.settings.exitOnDocument) return;

    const popup = (e.target as HTMLElement).closest('.fkw-popup');
    if (popup || !node.settings.exitOnDocument || !settings.exitOnDocument) return;

    toggleNode(node.id);
  }



  return <Suspense>
    <PopupContext.Provider value={context}>
      {children}

      <section className={cn(`fkw-popup-container`, className)} id='fkw-popup-container' {...props}></section>
    </PopupContext.Provider>
  </Suspense>;
};



/** 
 * Popup window
 */
export const PopupWindow: FC<IPopupWindowProps> = ({ children, className, layerClassName, style, id, settings: initialSettings, isOpen: state, setIsOpen: stateSetter, animation: initialAnimation, onExit, onOpen, ...props }) => {
  const ctx = useContext(PopupContext) as IPopupContextProps;

  state = useMemo(() => state ?? false, []);

  const [animation] = useState<PopupWindowAnimationType>(initialAnimation ?? 'scale');
  const [settings] = useState<IPopupSettings>(reassingObject(initialSettings ?? {}, DEFAULT_SETTINGS));
  const [container, setContainer] = useState<Element | null>(null);

  const [isOpen, setIsOpen] = useMixedState(state, stateSetter);
  const [zIndex, setZIndex] = useState<number>(0);



  // Mount
  useEffect(() => {
    setContainer(document.querySelector('#fkw-popup-container'));

    ctx.registerNode({
      id,
      open: state,
      zIndex: 0,
      settings
    });
  }, []);

  // Handle onOpen, onExit
  useEffect(() => {
    if (isOpen && onOpen) onOpen();
    if (!isOpen && onExit) onExit();
  }, [isOpen]);

  // Listen context
  useEffect(() => {
    const node = ctx.nodes.find(el => el.id === id);
    if (!node) return;

    setIsOpen(node.open);

    if (node.zIndex !== 0) {
      // Instantly update zIndex
      setZIndex(node.zIndex);
    } else {
      // Timeout zIndex update
      setTimeout(() => {
        setZIndex(node.zIndex);
      }, 200); // TODO: fix constant animation delay timeout
    }
  }, [ctx]);



  if (!container) return null;

  return createPortal(<section
    id={id}
    className={cn(`fkw-popup-layer`, isOpen && 'fkw-popup-layer--open', layerClassName)}
    style={{ zIndex: 10000 + zIndex, cursor: settings.exitOnDocument && !settings.preventStateChange ? 'pointer' : 'auto', ...style }}
    onClick={settings.exitOnDocument && !settings.preventStateChange ? e => ctx.toggleDocument(id, e) : undefined}
  >
    <article
      className={cn(`fkw-popup`, isOpen && 'fkw-popup--open', animation && `fkw-popup-animation--${animation}`, className)}
      role='dialog'
      aria-modal
      aria-hidden={!isOpen}
      {...props}
    >
      {children}
    </article>
  </section>, container);
};



/** 
 * Popup trigger button
 */
export const PopupButton: FC<IPopupButtonProps> = ({ children, as, className, onClick, disabled, popupId, ...props }) => {
  const ctx = useContext(PopupContext) as IPopupContextProps;

  const [isActive, setIsActive] = useState<boolean>(false);

  const Tag: keyof JSX.IntrinsicElements = as ?? 'button';



  // Listen context
  useEffect(() => {
    const node = ctx.nodes.find(el => el.id === popupId);
    if (!node) return;

    setIsActive(node.open);
  }, [ctx]);



  function toggle(e: React.MouseEvent) {
    ctx.toggleNode(popupId);
    onClick && onClick(e);
  }



  return <Tag className={cn('fkw-popup-button', isActive && 'fkw-popup-button--active', className)} role='button' onClick={toggle} aria-haspopup="dialog" tabIndex={0} disabled={disabled} aria-disabled={disabled} data-fkw-popup-operator={popupId} aria-label={isActive ? 'Close Popup' : 'Open Popup'} {...props}>
    {children}
  </Tag>;
};



function reassingObject(target: object, refference: object) {
  const payload = { ...refference };

  for (const key in target) {
    payload[key] = target[key];
  }

  return payload;
}