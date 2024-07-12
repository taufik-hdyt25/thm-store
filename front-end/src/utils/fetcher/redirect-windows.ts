interface IProps{
    ctx: any
}

export const redirect = ({ctx}:IProps)=> {
    if(ctx?.res){
        ctx.res.writeHead(303, {location: "/login"})
    }else{
        window.location.href = "/login"
    }
}