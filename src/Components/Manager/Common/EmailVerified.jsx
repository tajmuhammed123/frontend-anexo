import { 
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    Typography 
} from '@material-tailwind/react'
import './EmailVerified.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { managerVerify } from '../../../actions/ManagerActions'

function EmailVerified() {
    const [isFlipped, setIsFlipped] = useState(false)
    const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(() => {
        dispatch(managerVerify(id))
        console.log('nice');
    }, []);
    useEffect(() => {
        const iconElement = document.querySelector('.flip-animation');
        if (iconElement) {
          iconElement.classList.add('flipped');
        }
      }, []);
    
      const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
      };
  return (
    <div className='flex justify-center align-middle'>
        <Card className="mt-6 w-96 flex justify-center align-middle text-center">
        <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
            Thank You For Verifying your Email
            </Typography>
            <Typography>
            <FontAwesomeIcon
            icon={faCircleCheck}
            className={`flip-animation ${isFlipped ? 'manual-flip' : ''}`}
            style={{ color: '#00f504', fontSize: '80px' }}
            onClick={handleFlipClick}
        />
            </Typography>
        </CardBody>
        <CardFooter className="pt-0">
            <Button>Home</Button>
        </CardFooter>
        </Card>
    </div>
  )
}

export default EmailVerified