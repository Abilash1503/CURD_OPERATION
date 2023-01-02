import React ,{useState}from "react";
import "./App.css"
import { useFormik } from "formik";
import Popup from "./components/Popup";
const validate=values=>{
  const errors={}
  if(!values.firstname){
    errors.firstname="Required"

  }else if(values.firstname.length > 8){
    errors.firstname="*Must be 8 characters or less"
  }
  if(!values.lasttname){
    errors.lasttname="Required"

  }else if(values.lasttname.length > 8){
    errors.lasttname="*Must be 8 characters or less"
  }
  if(!values){
    errors.Email="*Required"
  }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.Email)){
    errors.Email="*Invaid Email"

  }
  if(!values.password){
    errors.password="*Required"
  }else if(values.password.length >8){
    errors.password="*Maximum 8 characters"
  }else if (values.password.length < 4){
    errors.password="*Minimum 4 characters"
  }

  if(!values.comformPassword){
    errors.comformPassword="*Required";
  }else if(values.password !==values.comformPassword){
    errors.comformPassword="*password mast match"
  }
  return errors
}

const App = () =>{
  const[bool,setbool]=useState(0)
  const formik= useFormik({
    initialValues :{
      firstname:"",
      lasttname:"",
      Email:"",
      password:"",
      comformPassword:""
    },
    validate,
    onSubmit:(values,{resetForm}) =>{
    if(bool){
      setbool(0)
      resetForm({values: ""})
    }else{
      setbool(1)
      console.log(values)
    }
    }
  })
 
  return(
     <div className="main">
      <div className="signUp-form">
      <h2>Sign Up Here</h2>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" placeholder="First Name"name="firstname" autoComplete="off"
         onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur}/>
         {
        formik.touched.firstname &&  formik.errors.firstname ? <span>{formik.errors.firstname}</span>: null
         }
        <input type="text" placeholder="Last Name"name="lasttname"  autoComplete="off"
         onChange={formik.handleChange} value={formik.values.lasttname}  onBlur={formik.handleBlur}/>
         {
         formik.touched.lasttname && formik.errors.lasttname ? <span>{formik.errors.lasttname}</span>: null
         }
        <input type="text" placeholder="Email "name="Email"  autoComplete="off"
        onChange={formik.handleChange} value={formik.values.Email}  onBlur={formik.handleBlur}/>
        {
         formik.touched.Email && formik.errors.Email ? <span>{formik.errors.Email}</span>: null
         }
        <input type="Password" placeholder="Password"name="password"  autoComplete="off"
        onChange={formik.handleChange} value={formik.values.password}  onBlur={formik.handleBlur}/>
        {
          formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span>: null
         }
        <input type="Password" placeholder="comform Password"name="comformPassword"  autoComplete="off"
        onChange={formik.handleChange} value={formik.values.comformPassword}  onBlur={formik.handleBlur}/>
        {
         formik.touched.comformPassword && formik.errors.comformPassword ? <span>{formik.errors.comformPassword}</span>: null
         }
        <input type="submit" value="submit"/>

      </form>
    
      </div>
      <div className="message-box">
      {
        bool?(<Popup onClick={formik.handleSubmit}/>):null
      }
      </div>
     </div>
    
  )
  

}

export default App