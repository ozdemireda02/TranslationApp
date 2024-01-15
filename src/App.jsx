import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/translateActions";
import Select from 'react-select'
import { setTranslated } from "./redux/translateSlice";

const App = () => {
  const state = useSelector((store) => store.translate);
  const dispatch = useDispatch();
  const [text,setText] = useState("");

  //kaynak dil
  const [sourceLang,setSourceLang] = useState({
    label:"Turkish",
    value:"tr",
  });
  // hedef dil
  const [targetLang,setTargetLang] = useState({
    label:"English",
    value:"en",
  });


  //  dil verilerini alır ve store'a aktarır
  useEffect(() => {
   
   dispatch(getLanguages());
  
  },[]);

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  // APİ'den gelen dizi içerisinden code ve name değerlerine sahip
  // objeleri label ve value değerlerine sahip
  // objelere çevirme.Ancak buradaki map bileşenin top-level code olduğu için
  // bileşen her render edildiğini yeniden çalışır.
  // bunu önlemek için useMemo kullandık.
  const refinedData = useMemo(() => state.languages.map((lang) => ({
    label:lang.name,
    value:lang.code,
  })),[state.languages]);

  // dilleri değiştirme
  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);
    
    // alt inputtaki veriyi üsttekine aktar
    setText(state.translatedText);
    // üst inputtaki veriyi alttakine yani store'a aktar
    dispatch(setTranslated(text));
  };


  return (
    <div id='main-page'>
      <div className="container">
        <h1>Çeviri +</h1>
        {/* üst kısım */}
        <div className="upper">
          <Select onChange={setSourceLang} isLoading={state.isLangsLoading} isDisabled={state.isLangsLoading} className="select" options={refinedData} value={sourceLang} />
          <button onClick={handleSwap}>Değiş</button>
          <Select onChange={setTargetLang} isLoading={state.isLangsLoading} isDisabled={state.isLangsLoading}  className="select" options={refinedData} value={targetLang} />
        </div>
        {/* orta kısım */}
        <div className="middle">
          <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)}  />
          </div>
          <div>
            {state.isTranslateLoading && 
            <div class="center">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
         </div>
           }
          <textarea value={state.translatedText} disabled />
          </div>
        </div>
        {/* alt kısım */}
        <button onClick={() => dispatch(translateText({sourceLang, targetLang, text}))}>Çevir</button>
      </div>
    </div>
  )
}

export default App
