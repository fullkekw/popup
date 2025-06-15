import './styles.scss';

import React, { createContext, FC, useContext, useEffect, useState } from "react";
import cn from 'classnames';
import { PopupButtonProps, PopupContextProps, PopupLayerProps, PopupNode, PopupWindowProps } from './Interfaces';
import { createPortal } from 'react-dom';







// export const PopupLayer: React.FC<PopupLayerProps> = ({ children, className, exitOnEscape, exitOnLayer, setIsPopupsOpen, preventScrollHiding, ...props }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const layerRef = useRef<HTMLDivElement>(null);

//   exitOnEscape = exitOnEscape ?? true;
//   exitOnLayer = exitOnLayer ?? true;


//   // Init
//   useEffect(() => {
//     const layer = layerRef.current;
//     if (!layer) throw new EFKW(`Layer ref is not found`);

//     const dialogs = layer.querySelectorAll(`.${'fkw-popup-dialog'}`);
//     if (!dialogs.length) throw new EFKW(`At least one dialog must be present inside PopupLayer`);
//   }, []);

//   // Observe mutations & handle click/keypress
//   useEffect(() => {
//     const layer = layerRef.current as HTMLDivElement;

//     const observer = new MutationObserver(() => {
//       const dialogs = layer.querySelectorAll(`.${'fkw-popup-dialog'}`);

//       let isPopupActive = false;

//       dialogs.forEach(dialog => {
//         if (dialog.classList.contains('fkw-popup-dialog--active')) isPopupActive = true;
//       });

//       setIsOpen(isPopupActive);
//     });

//     observer.observe(layer, {
//       childList: true,
//       subtree: true,
//       attributes: true
//     });

//     // Hadnle click/keypress
//     layer.addEventListener('mousedown', e => {
//       if (!exitOnLayer) return;

//       const self = e.target as HTMLDivElement | undefined;
//       if (!self) return;

//       if (self.classList.contains('fkw-popup-layer')) closeAll();
//     });

//     window.addEventListener('keydown', e => {
//       if (!exitOnEscape) return;

//       const key = e.key;

//       if (key === 'Escape') closeAll();
//     });
//   }, []);

//   // Handle isOpen & setIsPopupsOpen
//   useEffect(() => {
//     if (!preventScrollHiding) {
//       if (isOpen) {
//         document.body.classList.add('fkw-popup--noScroll');
//       } else {
//         document.body.classList.remove('fkw-popup--noScroll');
//       }
//     }

//     if (setIsPopupsOpen) setIsPopupsOpen(isOpen);
//   }, [isOpen]);



//   function closeAll() {
//     const layer = layerRef.current as HTMLDivElement;
//     const dialogs = layer.querySelectorAll(`.${'fkw-popup-dialog'}`);

//     if (!layer.classList.contains('fkw-popup-layer--active')) return;

//     dialogs.forEach(el => {
//       if (el.classList.contains('fkw-popup-dialog--actionsPrevented')) return;
//       el.classList.add('fkw-popup-dialog--close');
//     });
//   }



//   return <div className={cn('fkw-popup-layer', isOpen && 'fkw-popup-layer--active', exitOnLayer && 'fkw-popup-layer--exitOnLayer', className)} ref={layerRef} {...props}>
//     {children}
//   </div>;
// };

// export const PopupDialog: React.FC<PopupDialogProps> = ({ children, className, id, preventUserInteractions, state, stateSetter, animation, ...props }) => {
//   animation = animation !== null ? animation ?? 'fade' : null;

//   const [isOpen, setIsOpen] = useState(false);

//   const dialogRef = useRef<HTMLDivElement>(null);



//   // Init
//   useEffect(() => {
//     const dialog = dialogRef.current;
//     if (!dialog) throw new EFKW(`Dialog ref is not found`);
//   }, []);

//   // Observe mutations
//   useEffect(() => {
//     const dialog = dialogRef.current as HTMLDivElement;

//     const observer = new MutationObserver(() => {
//       if (preventUserInteractions) return console.warn(`[fkw-popup]: User action prevented`);

//       if (dialog.classList.contains('fkw-popup-dialog--open')) {
//         dialog.classList.remove('fkw-popup-dialog--open');
//         toggle(true);
//       }

//       if (dialog.classList.contains('fkw-popup-dialog--close')) {
//         dialog.classList.remove('fkw-popup-dialog--close');
//         toggle(false);
//       }
//     });

//     observer.observe(dialog, {
//       attributes: true
//     });
//   }, []);

//   // Handle isOpen
//   useEffect(() => {
//     const buttons = document.querySelectorAll(`[data-fkw-popup-dialog="${id}"]`);

//     buttons.forEach(button => {
//       if (isOpen) {
//         button.classList.add('fkw-popup-button--active');
//       } else {
//         button.classList.remove('fkw-popup-button--active');
//       }
//     });
//   }, [isOpen]);

//   //* Sync inner state when out changed
//   useEffect(() => {
//     if (state === undefined) return;

//     setIsOpen(state);
//   }, [state]);



//   function toggle(forceState?: boolean) {
//     const to = forceState ?? !isOpen;

//     if (stateSetter !== undefined && state !== undefined) {
//       //* Sync only out state with inner
//       stateSetter(to);
//     } else if (stateSetter !== undefined && state === undefined) {
//       //* Sync both states
//       stateSetter(to);
//       setIsOpen(to);
//     } else {
//       //* Sync only inner state with out
//       setIsOpen(to);
//     }
//   }



//   return <div className={cn('fkw-popup-dialog', isOpen && 'fkw-popup-dialog--active', preventUserInteractions && 'fkw-popup-dialog--actionsPrevented', animation && `${'fkw-popup-animation'}--${animation}`, className)} id={id} ref={dialogRef} role='dialog' aria-modal aria-hidden={!isOpen} {...props}>
//     {children}
//   </div>;
// };

// export const PopupButton: React.FC<PopupButtonProps> = ({ children, className, togglePopupId, disabled, onClick, as, ...props }) => {
//   const Tag: keyof JSX.IntrinsicElements = as ?? 'button';

//   function toggle() {
//     if (disabled) return;

//     togglePopup(togglePopupId);
//     onClick ? onClick() : null;
//   }

// return <Tag className={cn('fkw-popup-button', className)} onClick={toggle} aria-haspopup="dialog" tabIndex={0} data-fkw-popup-dialog={togglePopupId} disabled={disabled} aria-disabled={disabled} {...props}>
//   {children}
// </Tag>;
// };



// function togglePopup(id: string) {
//   const dialog = document.querySelector(`#${id}`) as HTMLDivElement;
//   if (!dialog) throw new EFKW(`Dialog #${id} is not found in DOM`);

//   if (dialog.classList.contains('fkw-popup-dialog--actionsPrevented')) return console.warn(`[fkw-popup]: User action prevented`);

//   if (dialog.classList.contains('fkw-popup-dialog--active')) {
//     dialog.classList.add('fkw-popup-dialog--close');
//   } else {
//     dialog.classList.add('fkw-popup-dialog--open');
//   }
// }



// @ts-expect-error Need empty object
const PopupContext = createContext<PopupContextProps>({});


/** 
 * Popup layer. Must be inside body tag
 */
export const PopupLayer: FC<PopupLayerProps> = ({ className, children }) => {
  const [nodes, setNodes] = useState<PopupNode[]>([]);

  const context: PopupContextProps = {
    nodes,
    toggleNode,
  };



  /** 
   * @param state Forced state
   */
  function toggleNode(id: string, state?: boolean) {
    state = state ?? !nodes.some(el => el.id === id);

    const popup = document.querySelector(`#${id}`);
    if (!popup) throw new Error(`PopupWindow (#${id}) is not found in DOM`);



    // Handle state
    if (state) {
      // Open popup
      setNodes(prev => [...prev, { id }]);
    } else {
      // Close popup
      setNodes(prev => prev.filter(el => el.id !== id));
    }
  }



  return <PopupContext.Provider value={context}>
    {children}

    <section className={cn(`fkw-popup-container`, className)} id='fkw-popup-container'></section>
  </PopupContext.Provider>;
};



/** 
 * Popup item
 */
export const PopupWindow: FC<PopupWindowProps> = ({ children, className, layerClassName, id, ...props }) => {
  const ctx = useContext(PopupContext) as PopupContextProps;

  const [isMounted, setIsMounted] = useState(false);
  const [container, setContainer] = useState<Element | null>(null);

  const [isOpen, setIsOpen] = useState(false);



  // Mount
  useEffect(() => {
    setContainer(document.querySelector('#fkw-popup-container'));
    setIsMounted(true);
  }, []);

  // Listen context
  useEffect(() => {
    setIsOpen(ctx.nodes.some(el => el.id === id));
  }, [ctx]);



  if (!isMounted || !container) return null;

  return createPortal(<section className={cn(`fkw-popup-layer`, isOpen && 'fkw-popup--open', layerClassName)} id={id}>
    <article className={cn(`fkw-popup`, className)} {...props}>
      {children}
    </article>
  </section>, container);
};



/** 
 * Popup trigger button
 */
export const PopupButton: FC<PopupButtonProps> = ({ children, as, className, onClick, disabled, popupId, ...props }) => {
  const { toggleNode } = useContext(PopupContext) as PopupContextProps;

  const Tag: keyof JSX.IntrinsicElements = as ?? 'button';



  function toggle(e: React.MouseEvent) {
    toggleNode(popupId);
    onClick && onClick(e);
  }



  return <Tag className={cn('fkw-popup-button', className)} role='button' onClick={toggle} aria-haspopup="dialog" tabIndex={0} disabled={disabled} aria-disabled={disabled} data-fkw-popup-operator={popupId} {...props}>
    {children}
  </Tag>;
};