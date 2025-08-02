import React, { FC, ReactNode } from "react";



export type PopupWindowAnimationType = 'fade' | 'scale' | null

export interface PopupSettings {
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

export interface PopupNode {
  id: string
  open: boolean
  zIndex: number
  settings: PopupSettings
}

export interface PopupContextProps {
  nodes: PopupNode[]
  toggleNode(node: string | PopupNode, state?: boolean): void
  registerNode(node: PopupNode): void
  toggleDocument(id: string, e: React.MouseEvent): void
}



export interface PopupLayerProps {
  children: ReactNode | ReactNode[]

  className?: string
  settings?: PopupSettings
  style?: React.CSSProperties
}



export interface PopupWindowProps {
  id: string

  children?: ReactNode | ReactNode[]
  className?: string
  style?: React.CSSProperties
  layerClassName?: string
  settings?: PopupSettings

  onOpen?(): void
  onExit?(): void

  /** Render popup in DOM only when user requested it */
  renderOnDemand?: boolean

  /** Passed useState value */
  isOpen?: boolean

  /** Passed useState setter */
  setIsOpen?(isOpen: boolean): void

  /** 
   * Popup animation
   * 
   * @default "scale"
   */
  animation?: PopupWindowAnimationType
}



export interface PopupButtonProps {
  popupId: string

  className?: string
  style?: React.CSSProperties
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