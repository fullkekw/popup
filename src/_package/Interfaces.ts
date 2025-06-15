import React, { FC, ReactNode } from "react";



export interface PopupNode {
  id: string
}

export interface PopupContextProps {
  nodes: PopupNode[]
  toggleNode(id: string, state?: boolean): void
}



export interface PopupLayerProps {
  children: ReactNode | ReactNode[]

  className?: string
}



export interface PopupWindowProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  id: string

  children?: ReactNode | ReactNode[]
  layerClassName?: string

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