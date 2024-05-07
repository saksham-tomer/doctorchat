
export default function NavBarLayout({
    children
}:{children: React.ReactNode}){
    return(
        <div className="min-h-screen relative flex items-center justify-center flex-col bg-gradient-radial from-white to-blue-100 bg-cover backdrop-blur-2xl ">
            {children}
        </div>
    )
}