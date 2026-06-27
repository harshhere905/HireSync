import { createContext,useState,useEffect } from "react"
import { UserDetails } from "./services/auth.api.js"

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        const GetAndSetUser=async()=>{
            try{
                const data=await UserDetails()
                setUser(data.user)
            }
            catch(err){
                console.error(err)
            }
            finally{
                setLoading(false)
            }
        }
        GetAndSetUser()
    },[])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}