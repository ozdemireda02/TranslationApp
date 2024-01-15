import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants";


// bütün dilleri
export const getLanguages = createAsyncThunk(
    "translate/getLanguages",
    async () => {
        // api isteği atar
        // methodu tipi(get) options'ta yazdığı için bir daha get yazmak yerine request kullandık
        // url options'un içinde yazdığından parantez içine url yerine options 'u yazdık
        const res = await axios.request(options);

        // return etme
        return res.data.data.languages;
    }
);

// çevir
export const translateText = createAsyncThunk(
    "translate/text",
    async({sourceLang, targetLang, text}) => {
        console.log(sourceLang, targetLang, text)
        // api isteğine gönderilecek parametreleri ayarlama
        const params = new URLSearchParams();
params.set('source_language', sourceLang.value);
params.set('target_language', targetLang.value);
params.set('text', text);

console.log(params)

const options = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '2734436afamsh7a20529892e7741p134c4cjsn3a8b545f2cd3',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: params,
};
// yukarıdaki ayarlara göre api isteği atar
const res = await axios.request(options);

 // cevabı slice'a aktar
  return res.data.data.translatedText;

    })