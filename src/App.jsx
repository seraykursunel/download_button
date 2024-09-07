import { useState, useEffect } from 'react'
import Header from './components/Header'
import File from './components/File'
import Footer from './components/Footer'
import generateMessage from './utilities/generateMessage'
import './styles.css'
import { detect } from 'detect-browser'

export default function App({ serverGeneratedFileId }) {
  const [userData, setUserData] = useState({
    userId: crypto.randomUUID(),
    downloadRequested: false,
    downloadTimeStamp: undefined,
    requestedFileId: undefined,
    browser: undefined,
    location: { ip: undefined, city: undefined, country: undefined },
  })

  const [buttonActive,setButtonActive]= useState(false) 

  if (userData.downloadRequested) {
    generateMessage(userData)
  }

  useEffect(() => {
    if (userData.downloadRequested) {
      throw Error('userID değişti :-(')
    }
  }, [userData.userId])

  const date = new Date ()

  
  

  const handleChange = async ()=> {
   
    const url = "https://ipapi.co/json"
  
    const response = await fetch(url)
    const json = await response.json()
    setButtonActive(true)
    setUserData((prevData)=>({
      ...prevData,
      userId:userData.userId,
      downloadRequested:true,
      downloadTimeStamp: date.toLocaleString(),
      requestedFileId:serverGeneratedFileId,
      browser:detect(),
      location:{
        ip: json.ip,
        city:json.city,
        country:json.country_name
      }
     
    }))
    
  }
  console.log(userData)

  /* Challenge

	Bu dosya için indirme sayfasının bir indirme butonuna ihtiyacı var. Göreviniz aşağıdaki gibi bir tane oluşturmaktır: 
      
      	1. Kullanıcı aşağıdaki 67. satırdaki "İndir" butonuna tıkladığında, buton devre dışı kalmalı ve userData state'i aşağıdaki gibi güncellenmelidir: 
		   
           	        Özellik		 	  Değer(ler)	  
			     ╷---------------------╷-----------------------------------------------------------╷
			     |  userId             |  önceki userData state'inin userId değerini korur         |
			     |---------------------|-----------------------------------------------------------|
		  	   |  downloadRequested  |  true                                             				 |
			     |---------------------|-----------------------------------------------------------|
			     |  downloadTimeStamp  |  localeString'e dönüştürülmüş yeni bir Date nesnesi       |
			     |---------------------|-----------------------------------------------------------|
			   	 |  requestedFileId    |  indirme butonunda veri olarak saklanan dosya ID'si       |
           |---------------------|-----------------------------------------------------------|
			     |  browser            |  detect fonksiyonunun return değeri 		                   |
				   |					           |      (zaten bu dosyaya aktarılmış)						             |
           |---------------------|-----------------------------------------------------------|
			     |  location      		 |  aşağıdaki özelliklere sahip bir nesne:	  		           |
			     |					           |  - ip: kullanıcının IP adresi				                     |
				   |					           |	 - city: kullanıcının şehir adı					                 |
				   |					           |	 - country: kullanıcının ülkesinin adı		    	         |
           |                     |       													                           |
			     ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
		 	2. Yukarıdakiler dışında, kodda başka hiçbir şeyin değiştirilmesine veya eklenmesine gerek yoktur. Bu görevleri başarıyla tamamlarsanız, konsolda doğru şekilde işlenmiş bir mesaj görmeniz ve butonun tıkladıktan sonra silik ve tıklanamaz hale gelmesi gerekir. 
*/

  return (
    <div>
      <Header />
      <main>
        <File />
        <div>
          <button
            className='download-button'
            data-file-id={serverGeneratedFileId}
            onClick={handleChange}
            disabled={buttonActive}
          >
            İndir
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
