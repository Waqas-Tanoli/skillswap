interface Props{
level:string;
}

export default function LevelBadge({
level
}:Props){

const colors={

beginner:
"bg-green-100 text-green-700",

intermediate:
"bg-yellow-100 text-yellow-700",

advanced:
"bg-blue-100 text-blue-700"

};

return(

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
colors[level as keyof typeof colors]
}`}
>

{level}

</span>

);

}