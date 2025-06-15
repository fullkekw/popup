import React, { FC, ReactNode } from "react";



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
  toggleNode(id: string, state?: boolean): void
  registerNode(node: PopupNode): void
  toggleDocument(id: string, e: React.MouseEvent): void
}



export interface PopupLayerProps {
  children: ReactNode | ReactNode[]

  className?: string
  settings?: PopupSettings
}



export interface PopupWindowProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  id: string

  children?: ReactNode | ReactNode[]
  layerClassName?: string
  defaultOpen?: boolean
  settings?: PopupSettings

  /** Passed useState value */
  isOpen?: boolean

  /** Passed useState setter */
  setIsOpen?(isOpen: boolean): void

  /** @todo */
  animation?: 'fade' | 'scale' | null
}



export interface PopupButtonProps extends React.DetailsHTMLAttributes<HTMLElement> {
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