import { NextResponse } from "next/server";
export function middleware(request) {
    //cara 2
    // if(request.nextUrl.pathname === '/home'){
    //     return console.log("Test Middleware");
    // }

    //untuk membuat route ex: /dashboard/home or /dashboard/user
    // if(request.nextUrl.pathname.startsWith('/home')){
    //     return console.log("Test Middleware");
    // }
    // return NextResponse.next();

    //redirect
    // if (request.nextUrl.pathname.startsWith('/home')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    //cookie
    // const response = NextResponse.next();
    // if (request.nextUrl.pathname.startsWith('/home')) {
    //     response.cookies.set('test', 'datatest')
    //     // console.log(response.cookies.get('test').value);
    //     if(response.cookies.get('token') == undefined){
    //         console.log("success");
    //     }
    //     return response;
    // }

    const response = NextResponse.next();
    if (request.nextUrl.pathname.startsWith('/home')) {
        response.cookies.set('test', 'datatest')
        const cookie = request.cookies.get('token')?.value
        console.log("testset",cookie);

        if(cookie == undefined){
            // return NextResponse.redirect(new URL('/', request.url));
            return NextResponse.redirect('http://localhost:3000');
        }
        return response;
    }
}

//cara 1
// export const config = {
//     matcher: ['/home']
//     // matcher: ['/home', '/login']
// }