import{G as j,u as y,j as e,o as b,s as o,d as f,e as N,f as w,g as C,h as r,i as n,k as i,l as c,I as m,m as d,C as F,L as v,n as x,B as l,p as k,t as L,_ as h,q as S,W as z}from"./index-BglBb5Su.js";import{u as I}from"./useMutation-Cw_0Raqv.js";function M(a){return j({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:`M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z`},child:[]},{tag:"path",attr:{fill:"#FF3D00",d:`M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z`},child:[]},{tag:"path",attr:{fill:"#4CAF50",d:`M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z`},child:[]},{tag:"path",attr:{fill:"#1976D2",d:`M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z`},child:[]}]})(a)}const T=()=>{const{theme:a}=y();return e.jsx("div",{className:"w-full h-[1px] bg-primary relative my-2 top-3",children:e.jsx("span",{className:`absolute top-0 left-1/2 text-primary ${a==="dark"?"bg-black":"bg-white"} rounded-full translate-y-[-50%] translate-x-[-50%] w-7 h-7 text-center`,children:"or"})})},B=b({email:o().email(),password:o().min(8).max(50),remember:f().optional()}),E=()=>{const a=N(),t=w({resolver:L(B),defaultValues:{email:"",password:""}}),{mutate:p,isPending:u}=I({mutationFn:async s=>await(await fetch("https://radwan.up.railway.app/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)})).json(),onSuccess:s=>{console.log(s),h.success("Logged in successfully"),localStorage.setItem("user",JSON.stringify(s.user)),a("/home")},onError:s=>{h.error(s.message),console.error(s)}});async function g(s){p(s)}return e.jsx(C,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(g),className:"space-y-3 basis-full sm:basis-1/4 ",children:[e.jsx("h2",{className:"text-center font-bold",children:"Welcome Back !"}),e.jsx(r,{control:t.control,name:"email",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Email"}),e.jsx(c,{children:e.jsx(m,{placeholder:"Enter your email",...s,type:"email",className:"px-4 py-6"})}),e.jsx(d,{})]})}),e.jsx(r,{control:t.control,name:"password",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Password"}),e.jsx(c,{children:e.jsx(m,{placeholder:"*********",...s,type:"password",className:"px-4 py-6"})}),e.jsx(d,{})]})}),e.jsx(r,{name:"remember",control:t.control,render:({field:s})=>e.jsxs(n,{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center justify-start gap-2",children:[e.jsx(F,{id:s.name,checked:s.value,onCheckedChange:s.onChange}),e.jsx(v,{htmlFor:s.name,className:"font-medium",children:"Remember me"})]}),e.jsx(x,{to:"/forget-password",className:"text-primary hover:text-primary/90 -translate-y-[0.3rem] font-medium",children:"Forget password ?"})]})}),e.jsx(l,{type:"submit",size:"lg",className:"w-full bg-primary",disabled:u,children:"Login"}),e.jsx(T,{}),e.jsxs("div",{className:"flex gap-6 items-center translate-y-6",children:[e.jsxs(l,{size:"lg",className:"bg-background text-primary hover:text-white border border-primary flex basis-1/2 items-center justify-center",children:[e.jsx(M,{size:20,className:"mr-2"}),"Google"]}),e.jsxs(l,{size:"lg",className:"bg-background text-primary hover:text-white border border-primary flex basis-1/2 items-center justify-center",children:[e.jsx(k,{size:20,className:"mr-2"}),"LinkedIn"]})]}),e.jsxs("p",{className:"translate-y-6 flex justify-center items-center gap-2",children:["Don’t have an account ?"," ",e.jsx(x,{className:"text-primary hover:text-primary/90 text-sm font-bold",to:"/sign-up",children:"sign up"})]})]})})},P=()=>e.jsxs(S,{children:[e.jsx(E,{}),e.jsx(z,{})]});export{P as default};