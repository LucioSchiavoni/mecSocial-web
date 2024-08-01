import AllPost from "../components/AllPost";
import Friends from "../components/Friends";
import Layout from "../components/Layout";
import ProfileSm from "../components/ProfileSm";
import { ScrollShadow } from "@nextui-org/react";



export const HomeAuth = () => {
   
    return (
       <>
        <Layout>
             
              <ProfileSm/>
    
<div className="">


            <ScrollShadow
            hideScrollBar
            offset={100}
            orientation='horizontal'
            className='max-w-[2000px] max-h-[100px] '
            >

               <AllPost/> 
            </ScrollShadow>
     </div>      
              <Friends/>



       
        </Layout>
          
 
            
         </>
    );
};

export default HomeAuth;
