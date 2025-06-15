import React, { FC, ReactNode } from "react";



export interface PopupNode {
  id: string
  open: boolean
  zIndex: number
}

export interface PopupContextProps {
  nodes: PopupNode[]
  toggleNode(id: string, state?: boolean): void
  registerNode(node: PopupNode): void
}



export interface PopupLayerProps {
  children: ReactNode | ReactNode[]

  className?: string
}



export interface PopupWindowProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  id: string

  children?: ReactNode | ReactNode[]
  layerClassName?: string
  defaultState?: boolean

  /** @todo */
  animation?: 'fade' | 'scale' | null
  /** @todo */
  preventStateChange?: boolean
  /** @todo */
  exitOnEscape?: boolean
  /** @todo */
  exitOnDocument?: boolean
  /** @todo */
  disableScroll?: boolean
  /** @todo */
  isOpen?: boolean
  /** @todo */
  setIsOpen?(isOpen: boolean): void
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