![cover](https://raw.githubusercontent.com/fullkekw/popup/main/cover.png)

Headless popup component for React, with built-in typescript types! 

## 🎉 Installation
```bash
$ npm install @fullkekw/popup
$ pnpm install @fullkekw/popup
$ yarn add @fullkekw/popup
```

Usage
```tsx
import { FC } from 'react';
import { PopupLayer, PopupWindow, PopupButton} from '@fullkekw/popup'
import '@fullkekw/popup/css'; // Basic styles

const Page: FC = (props) => {
  const popupId1 = 'popupId1'
  const popupId2 = 'popupId2'

  return <body>
    <PopupLayer>
      <PopupWindow id={popupId1}>
        Popup Content 1

        <PopupButton popupId={popupId1}>
          Close popup 1
        </PopupButton>

        <PopupButton popupId={popupId2}>
          Open popup 2
        </PopupButton>
      </PopupWindow>

    {/* Nested window always will be on top of the stacking context */}
      <div>
        <PopupWindow id={popupId2}>
          Popup Content 2

          <PopupButton popupId={popupId2}>
            Close popup 2
          </PopupButton>
        </PopupWindow>
      </div>
    </PopupLayer>
  </div>
}

export default Page;
```

## ✨ Features
- Popup can be closed by press escape or by click on layer
- Synthetic state handling (useState can be passed into the component)
- Headless component with only basic styling
- Built-in animations
- Prevent user from state change (only synthetic)
- Implement [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- Popups can be nested
- Will always be on top of the stacking context
- Hightly customizable (you can even turn off scroll hide!)
- Does not break elements with sticky position on oveflow hide

## 👀 Examples
Synthetic state handle. Will be opened by default
```tsx
import { FC, useState } from 'react';
import { PopupLayer, PopupWindow, PopupButton} from '@fullkekw/popup'
import '@fullkekw/popup/css';

const Page: FC = (props) => {
  const popupId1 = 'popupId1'

  const [state, setState] = useState(true)

  return <body>
    <PopupLayer>
      <PopupWindow id={popupId1} isOpen={state} setIsOpen={setState}>
        Popup Content

        <PopupButton popupId={popupId1}>
          Close popup
        </PopupButton>
      </PopupWindow>
    </PopupLayer>
  </body>
}

export default Page;
```

Disable exit on layer & escape
```tsx
import { FC } from 'react';
import { PopupLayer, PopupWindow, PopupButton} from '@fullkekw/popup'
import '@fullkekw/popup/css';

const Page: FC = (props) => {
  const popupId1 = 'popupId1'

  return <body>
    <PopupLayer>
      <PopupWindow id={popupId1} settings={{exitOnLayer: false, exitOnDocument: false}}>
        Popup Content

        <PopupButton popupId={popupId1}>
          Close popup
        </PopupButton>
      </PopupWindow>
    </PopupLayer>
  </body>
}

export default Page;
```

## ⚙️ API
```ts
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



export interface PopupLayerProps {
  children: ReactNode | ReactNode[]

  className?: string
  settings?: PopupSettings
}



export interface PopupWindowProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  id: string

  children?: ReactNode | ReactNode[]
  layerClassName?: string
  settings?: PopupSettings

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
```

## ☁️ Migration Guides
- [From @fullkekw/fkw-popup@1.2.5](./docs/migration.md#fullkekwfkw-popup125)

## ©️ License
Licensed under MIT