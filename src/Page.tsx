import React, { useState, useEffect, useId } from "react";
import { PopupLayer, PopupButton, PopupWindow } from './_package/index';



const Page: React.FC = () => {
  const [state, setState] = useState(false);

  const popupId1 = useId().replaceAll(':', '');
  const popupId2 = useId().replaceAll(':', '');



  useEffect(() => {
    setTimeout(() => {
      console.log('close');
      setState(true);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(`out state `, state);
  }, [state]);


  function onOpen() { console.log('op'); }
  function onExit() { console.log('ex'); }



  return (
    <>
      <PopupLayer>
        <div className="Home bg-slate-400 w-full h-full min-h-screen" id="screen">
          <div className="w-full h-[50px] bg-red-400 sticky top-0">
            header
          </div>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

          <div>
            <div>
              <PopupWindow className="popup-1 w-[500px] bg-white p-[20px]" layerClassName="p-[20px]" id={popupId1} isOpen={state} setIsOpen={setState} onOpen={onOpen} onExit={onExit}>
                Hello

                <div className="overflow-y-auto h-full bg-red-400">
                  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>

                <PopupButton popupId={popupId1}>
                  Close popup
                </PopupButton>

                <PopupButton popupId={popupId2}>
                  Open popup 2
                </PopupButton>
              </PopupWindow>

              <PopupWindow id={popupId2}>
                Hello2

                <PopupButton popupId={popupId2}>
                  Close popup
                </PopupButton>

                <PopupButton popupId={popupId1}>
                  Open popup 1
                </PopupButton>
              </PopupWindow>
            </div>
          </div>

          <button onClick={() => setState(prev => !prev)}>
            chnage state
          </button>

          <br />

          <PopupButton popupId={popupId1}>
            Open popup
          </PopupButton>
          <br />

          <PopupButton popupId={popupId2}>
            Open popup 2
          </PopupButton>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </PopupLayer>
    </>
  );
};

export default Page;