import React, { FC, ReactNode } from "react";



export type StateSetter<S = any> = React.Dispatch<React.SetStateAction<S>>;
export type PopupWindowAnimationType = 'fade' | 'scale' | null



export interface IPopupSettings {
  /** Prevent state change due to user interactions (only synthetic) */
  preventStateChange?: boolean

  /** 
   * Close popup on Escape
   * 
   * @default true
   */
  exitOnEscape?: boolean

  /** 
   * Close popup on document click
   * 
   * @default true
   */
  exitOnDocument?: boolean

  /** 
   * Disable document scroll when popup open
   * 
   * @default true
   */
  disableScroll?: boolean
}

export interface IPopupNode {
  id: string
  open: boolean
  zIndex: number
  settings: IPopupSettings
}

export interface IPopupContextProps {
  nodes: IPopupNode[]
  toggleNode(node: string | IPopupNode, state?: boolean): void
  registerNode(node: IPopupNode): void
  toggleDocument(id: string, e: React.MouseEvent): void
}



export interface IPopupLayerProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode | ReactNode[]

  settings?: IPopupSettings
}



export interface IPopupWindowProps extends React.HTMLAttributes<HTMLElement> {
  id: string

  children?: ReactNode | ReactNode[]
  layerClassName?: string
  settings?: IPopupSettings

  onOpen?(): void
  onExit?(): void

  /** Passed useState value */
  isOpen?: boolean

  /** Passed useState setter */
  setIsOpen?: StateSetter<boolean>

  /** 
   * Popup animation
   * 
   * @default "scale"
   */
  animation?: PopupWindowAnimationType
}



export interface IPopupButtonProps extends React.HTMLAttributes<HTMLElement> {
  popupId: string

  children?: ReactNode | ReactNode[]
  onClick?(e: React.MouseEvent): void
  disabled?: boolean

  /** 
   * Tag name
   * 
   * @default "button"
   */
  as?: 'button' | 'div'
}