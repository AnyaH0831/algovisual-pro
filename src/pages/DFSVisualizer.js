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

const INITIAL_NODES = [
    {id: 0, x: 120, y: 60, label: 'A'},
    {id: 1, x: 320, y: 60, label: 'B'},
    {id: 2, x: 520, y: 60, label: 'C'},
    {id: 3, x: 120, y: 220, label: 'D'},
    {id: 4, x: 320, y: 220, label: 'E'},
    {id: 5, x: 520, y: 220, label: 'F'},
    {id: 6, x: 220, y: 360, label: 'G'},
    {id: 7, x: 420, y: 360, label: 'H'}
];

const ADJACENCY = {
    0: [1,3],
    1: [0,2,4],
    2: [1,5],
    3: [0,4,6],
    4: [1,3,5,7],
    5: [2,4],
    6: [3],
    7: [4]
};

function DFSVisualizer(){
       
    const [nodes] = useState(INITIAL_NODES);
    const [edges] = useState(() => {
        const e = [];
        Object.keys(ADJACENCY).forEach(k => {
            ADJACENCY[k].forEach(nb => {
                const a = Number(k), b = Number(nb);
                if (a < b) e.push([a,b]);
            })
        });
        return e;
    });
 
    const [start] = useState(0);
    const [target, setTarget] = useState(7);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);

    const [visited, setVisited] = useState(() => Array(nodes.length).fill(false));
    const [stack, setStack] = useState([start]);
    const [current, setCurrent] = useState(null);
    const [found, setFound] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.lineWidth = 3;
        ctx.strokeStyle = COLORS.vanillaCustard;
        edges.forEach(([a,b]) => {
            const na = nodes[a], nb = nodes[b];
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
        });     
 
        nodes.forEach(n => {
            const r = 28;
            let fill = COLORS.darkTeal;
            if (n.id === current) fill = COLORS.goldenOrange;
            else if (visited[n.id]) fill = COLORS.dustyOlive;
            else if (stack.includes(n.id)) fill = COLORS.darkCyan;

            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI*2);
            ctx.fill();
            ctx.strokeStyle = COLORS.vanillaCustard;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = COLORS.vanillaCustard;
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y + 6);
        });
    }, [nodes, edges, visited, stack, current]);

    const handlePlay = () => { if (!found) setIsPlaying(true); }
    const handlePause = () => { setIsPlaying(false); }
    const handleReset = () => {
        setIsPlaying(false);
        setVisited(Array(nodes.length).fill(false));
        setStack([start]);    
        setCurrent(null);
        setFound(false);
    }
  
    // DFS stepper 
    useEffect(() => {
        if (!isPlaying) return;
        if (stack.length === 0) { setIsPlaying(false); return; }
        if (found) { setIsPlaying(false); return; }

        const delay = Math.max(50, 700 / speed);
        const timer = setTimeout(() => {
            const s = [...stack];
            const node = s.pop();
            setStack(s);
            setCurrent(node);

            setVisited(prev => {
                if (prev[node]) return prev;
                const copy = [...prev];
                copy[node] = true;
                return copy;
            });

            if (node === target) {
                setFound(true);
                setIsPlaying(false);
                setTimeout(() => alert(`Found target ${nodes[node].label} (id ${node})`), 50);
                return;
            }

            const neighbors = (ADJACENCY[node] || []).slice().reverse();
            neighbors.forEach(nb => {
                setVisited(prev => prev); 
                setStack(prev => {
                    if (prev.includes(nb) || visited[nb]) return prev;
                    return [...prev, nb];
                });     
            });
        
        }, delay);
                        
        return () => clearTimeout(timer);
    }, [isPlaying, stack, speed, found, target, nodes, visited]);       

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-5 text-center" style={{color: COLORS.vanillaCustard}}>DFS Visualizer</h2>                  
            <div className="flex justify-center my-5">    
                <canvas
                    ref={canvasRef}
                    width={700}
                    height={450}
                    className="rounded"
                    style={{border: `2px solid ${COLORS.goldenOrange}`}}
                />
            </div>

            <div className="flex justify-center gap-4 my-5">
                <button onClick={handlePlay} disabled={isPlaying || found} className="px-6 py-2 rounded font-semibold transition-all" style={{backgroundColor: isPlaying ? '#555' : COLORS.goldenOrange, color: COLORS.inkblack, cursor: isPlaying ? 'not-allowed' : 'pointer'}}>
                    Play
                </button>
                <button onClick={handlePause} disabled={!isPlaying} className="px-6 py-2 rounded font-semibold transition-all" style={{backgroundColor: !isPlaying ? '#555' : COLORS.goldenOrange, color: COLORS.inkblack, cursor: !isPlaying ? 'not-allowed' : 'pointer'}}>
                    Pause
                </button>
                <button onClick={handleReset} className="px-6 py-2 rounded font-semibold transition-all" style={{backgroundColor: COLORS.goldenOrange, color: COLORS.inkblack}}>
                    Reset
                </button>
            </div>

            <div className="flex justify-center gap-4 items-center">
                <label style={{color: COLORS.vanillaCustard}}>Target ID:
                    <select value={target} onChange={e => setTarget(Number(e.target.value))} className="ml-2 p-1 rounded text-black">
                        {nodes.map(n => <option key={n.id} value={n.id}>{n.id} - {n.label}</option>)}
                    </select>
                </label>
                <label style={{color: COLORS.vanillaCustard}}>Speed:
                    <input type="range" min="1" max="5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="ml-2" />
                </label>
            </div>

            <div className="text-center mt-4" style={{color: COLORS.vanillaCustard}}>
                <p>Start: <strong style={{color: COLORS.goldenOrange}}>{nodes[start].label} (id {start})</strong></p>
                <p>Current: <strong style={{color: COLORS.goldenOrange}}>{current !== null ? nodes[current].label + ` (id ${current})` : '—' }</strong>, Found: <strong style={{color: COLORS.rustySpice}}>{found ? 'Yes' : 'No'}</strong></p>
            </div>
        </div>
    )
}


export default DFSVisualizer;
   
