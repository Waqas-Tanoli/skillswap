interface Props{
    avatar:string;
}

export default function AvatarUploader({
avatar
}:Props){

return(

<div className="flex justify-center">

<img
src={
avatar ||
"https://ui-avatars.com/api/?name=User"
}
className="h-28 w-28 rounded-full border object-cover"
/>

</div>

);

}