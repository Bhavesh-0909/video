// import { NextResponse } from "next/server";

// export default function middleware(req){
//     let verify = req.cookies.get("user");
//     let url = req.url
    
//     if(!verify && url.includes('/')){
//         return NextResponse.redirect("http://localhost:3000/login");
//     }

//     if (verify && url === "http://localhost:3000/") {
//       return NextResponse.redirect("http://localhost:3000/");
//     }


// }