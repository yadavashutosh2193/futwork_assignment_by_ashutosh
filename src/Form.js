import { useEffect, useState } from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './Form.css';

export const Form = ()=>{
    const [formData, setFormData] = useState([]);
    useEffect(()=>{
        const fetchdata = async()=>{
        await fetch("https://us-east4-frapp-prod.cloudfunctions.net/dumdum-brand-details")
        .then(resp => resp.json())
        .then(data =>{
            setFormData(data) 
        })
    }
    fetchdata();
    console.log(formData)
    },[])
  return (
      <div className = "container mx-auto border border-success pb-3 mt-3">
          <div className = "row p-3 justify-content-center">
          <div className = "col">
          <span style = {{fontWeight: 'bold'}}>Start Date:  </span> 
           {formData.startDate.substring(0, 10)}
          </div>
          <div className = "col">
          <h2>{formData.title}</h2>
          </div>
          <div className = "col">
            <span style = {{fontWeight: 'bold'}}>End Date:  </span> 
             {formData.endDate.substring(0, 10)}
          </div>
          
          </div>
          <div className = "row justify-content-center">
          <p>{formData.description}</p>
          </div>
          
              {formData.kycDocs.map(item=>{
                  return <>
                  <div className = "row">
                      <div className = "col border border-info p-3">{item.title}</div>
                      <div className = "col border border-info p-3"><img src = {item.url} alt = {item.title}/> </div>
                      </div>
                  </>
              })
            }
          <div className = "row">
              <div className = "col p-3">
                  {formData.organizationType.title}
              </div>
              <div className = "col p-3">
              <select id = "optionlist">
               <option value = {formData.organizationType.title} selected>{formData.organizationType.title}</option>
              {formData.organizationType.options !== undefined ? formData.organizationType.options.map(item =>{
                     return <option value =  {item.optionText}>{item.optionText}</option>
                  })
                  : "ftching data"}
                 </select> 
              </div>
          </div>
          <div className = "row justify-content-center p-3">
              <button className = "bg-success text-white p-2 w-50">Save</button>
          </div> 
      </div>
      )
}