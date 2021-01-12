import React ,{useState,useEffect}from "react";
// import { connect } from "dva";
import Api from "../api/index";
import styles from "./IndexPage.css";
import Less from "./index.less"


// const less = require("./index.less")




const IndexPage = (props) =>{
  const getApi = async (params) => {
    const res = await Api.Login.userlogin(params);
    console.log(res,'111111')
    return res;
  };
  console.log(Less)
  const [state, setstate] = useState("啥也不是")
  const [tmp, settmp] = useState("临时的")

  // setstate("this is hooks")
  // const getQsApi = async (params) => {
  //   const res = await Qs.query(params);
  //   console.log(res,'222222')
  //   return res;
  // };
  // useEffect()
  const setCount = () => {
    const newvalue = 'this is hoos'
    setstate(newvalue)
  }
  useEffect(() => {
    console.log(111111)
    if(state == 'this is hoos'){
      settmp('当state改变我也要改变')

    }
    // return () => {
    //   cleanup
    // }
  })

  return (
    <header className={Less.container}>
      <h2 onClick={() => {
        setCount()
      }}>{state}</h2>
      <h2>{tmp}</h2>
    </header>
    // <div className={styles.normal}>
    //   <iframe
    //     className={styles.normal}
    //     src="../../public/spice-html5/spice.html"
    //   ></iframe>
    // </div>
  );
}


export default IndexPage;
