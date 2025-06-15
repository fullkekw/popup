import React, { useState, useEffect, useId } from "react";
import { PopupButton, PopupLayer, PopupWindow } from './_package/Package';



const Page: React.FC = () => {
  const [state, setState] = useState(false);

  const popupId1 = useId().replaceAll(':', '');
  const popupId2 = useId().replaceAll(':', '');


  useEffect(() => {
    console.log(`out state `, state);
  }, [state]);



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
              <PopupWindow className="popup-1 w-[400px] h-[450px] bg-white" id={popupId1}>
                Hello

                <PopupButton popupId={popupId1}>
                  Close popup
                </PopupButton>
              </PopupWindow>

              <PopupWindow id={popupId2}>
                Hello2

                <PopupButton popupId={popupId2}>
                  Close popup
                </PopupButton>
              </PopupWindow>
            </div>
          </div>

          <PopupButton popupId={popupId1}>
            Open popup
          </PopupButton>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </PopupLayer>
    </>
  );
};

export default Page;