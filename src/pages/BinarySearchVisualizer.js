import {useState, useEffect, useRef} from 'react'

const COLORS = {
    inkblack:'#001219ff',
    darkTeal: '#005f73ff',
    darkCyan: '#0a9396ff',
    pineTeal: '#004733ff',
    dustyOlive: '#75906dff',
    vanillaCustard: '#e9d8a6ff',
    goldenOrange: '#ee9b00ff',
    rustySpice: '#bb3e03ff',
    oxidizedIron: '#ae2012ff',
    mahoganyRed: '#a5211cff'
};

function BinarySearchVisualizer(){

    //State Management
    const [array, setArray] = useState([7, 14, 21, 28, 35, 42, 49, 56, 63, 70]);
    const [target, setTarget] = useState(28);

    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const[speed, setSpeed] = useState(1);
    
    const[left, setLeft] = useState(0);
    const[right, setRight] = useState(array.length - 1);
    const[mid, setMid] = useState((left+right)/2);

    const canvasRef = useRef(null);

    //Draw function
    const draw = () => {

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        ctx.clearRect(0,0, canvas.width, canvas.height);

        const boxWidth = 60;
        const boxHeight = 60;
        const space = 10;
        const startX = 50;
        const startY = 100;

        array.forEach((value, index) => {
            const x = startX + index * (boxWidth + space);
            const y = startY;

            if (index === mid){
                ctx.fillStyle = COLORS.goldenOrange;
            }else if (index >= left && index <= right){
                ctx.fillStyle = COLORS.darkCyan;
            }else{
                ctx.fillStyle = COLORS.darkTeal;
            }


            ctx.fillRect(x,y,boxWidth,boxHeight);
            ctx.strokeStyle = COLORS.vanillaCustard;

            ctx.strokeRect(x,y,boxWidth,boxHeight);

            ctx.fillStyle = COLORS.vanillaCustard;
            ctx.font = '20px Arial';
            ctx.textAlign  = 'center';
            ctx.fillText(value, x + boxWidth/2, y + boxHeight/2 + 7);

            ctx.font = '14px Arial';
            ctx.fillText(index, x+boxWidth/2, y+boxHeight + 20);
        });

        

    };

    useEffect(() => {
        draw();
    }, [left,right, mid,array]);

    const handlePlay = () =>{
        setIsPlaying(true);
    }

    const handlePause = () => {
        setIsPlaying(false);
    }

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setLeft(0);
        setRight(array.length - 1);
        setMid(Math.floor((0+array.length - 1) / 2));
    }

    useEffect(() => {
        if (!isPlaying) return;
        if (left>right){
            setIsPlaying(false);
            return;
        }

        if (array[mid] === target) {
            setIsPlaying(false);
            alert(`Found ${target} at index ${mid}!`);
            return;
        }

        const timer = setTimeout(() => {
            if (array[mid] < target){
                setLeft(mid+1);
            }else{
                setRight(mid - 1);
            }

            let newLeft;
            if (array[mid] < target){
                newLeft = mid + 1;
            }else{
                newLeft = left;
            }

            let newRight;
            if (array[mid] < target){
                newRight = right;
            }else{
                newRight = mid - 1;
            }
            setMid(Math.floor((newLeft + newRight) /2));
            setLeft(newLeft);
            setRight(newRight);
            setCurrentStep(currentStep + 1);

        }, 1000) //delay
        return () => clearTimeout(timer);
        
    }, [isPlaying,left,right,mid,currentStep, array, target, speed]); 

    


    return (
        <div>
            <h2>Binary Search</h2>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <canvas
                    ref = {canvasRef}
                    width = {800}
                    height = {300}
                    style = {{border: '1px solid black'}}
                />
            </div>

            <div style={{marginTop:'20px'}}>
                <button onClick={handlePlay} disabled={isPlaying}>
                    Play
                </button>
                <button onClick={handlePause} disabled={!isPlaying}>
                    Pause
                </button>
                <button onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div style={{marginTop:'10px'}}>
                <p>Target: {target}</p>
                <p>Left: {left}, Right:{right}, Mid: {mid}</p>
            </div>

        </div>
    )
}


export default BinarySearchVisualizer;

