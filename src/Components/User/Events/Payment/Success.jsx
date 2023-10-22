import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Success() {
  const [isFlipped, setIsFlipped] = useState(false)
  useEffect(() => {
    const iconElement = document.querySelector('.flip-animation');
    if (iconElement) {
      iconElement.classList.add('flipped');
    }
  }, []);

  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  };
  const navigate=useNavigate()
  return (
    <div className='grid place-items-center w-full lg:h-screen h-full
     font-raleway bg-[#F7F7F7]'>
      <div className='flex justify-center align-middle'>
        <Card className="mt-6 w-96 flex justify-center align-middle text-center">
        <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
            You have Booked Your Slot, Wait for Confirmation
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
            <Button onClick={()=>navigate('/')}>Home</Button>
        </CardFooter>
        </Card>
    </div>
    </div>
  )
}

export default Success
