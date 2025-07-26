// app/page.tsx
import Canvas from "@/components/Canvas";
import CanvasActions from "@/components/CanvasActions";
import ColorActions from "@/components/ColorActions";
import ZoomActions from "@/components/ZoomActions";
import LinkActions from "@/components/LinkActions";
import { CanvasProvider } from "@/context/CanvasContext";

const Home = () => {
    return (
        <CanvasProvider>
            <main>
                <h1
                    className="fixed top-[10px] left-[10px] z-[1] m-4 text-3xl font-bold"
                >Anarctism</h1>
                <Canvas />
                <CanvasActions />
                <ColorActions />
                <ZoomActions />
                <LinkActions />
            </main>
        </CanvasProvider>
    )
}

export default Home;