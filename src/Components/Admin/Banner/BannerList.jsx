import { EditIcon } from '@chakra-ui/icons'
import { Button, Card, IconButton, List, ListItem, ListItemSuffix } from '@material-tailwind/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { axiosAdminInstance } from '../../../Constants/axios'
import { useState } from 'react'

function BannerList() {
    const [banner,setBanner]=useState([])
    const queryClient=useQueryClient()
    const {isLoading,error,data}=useQuery({
      queryKey:['bannerlist'],
      queryFn:()=>axiosAdminInstance.get('/bannerdata').then((res)=>{setBanner(res.data.banner),console.log(res.data.banner)}).catch((err)=>console.log(err.message))
    })
    const navigate=useNavigate()
  return (
    <div className='w-full justify-center flex pt-5'>
    <Card className='w-1/3'>
      <List>
        {banner&&banner.map((item,index)=>(<ListItem ripple={false} className="py-1 pr-1 pl-4" key={index}>
            <div className='flex flex-row justify-between w-full place-items-center'>
                <div className='flex w-20'>
                    <img src={item.banner_img} alt="" />
                </div>
                <div>
                    {item.banner_text}
                </div>
                <div>
                {item.main_text}
                </div>
                <div>
                    {item.button_text}
                </div>
            </div>
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray" onClick={()=>navigate(`/admin/addbanner/${item._id}`)}>
              <EditIcon />
            </IconButton>
          </ListItemSuffix>
        </ListItem>))}
      </List>
      <Button onClick={()=>navigate('/addbanner/null')}>Add Banner</Button>
    </Card>
    </div>
  )
}

export default BannerList