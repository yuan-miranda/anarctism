// app/page.tsx
import Canvas from "@/components/Canvas";

const Home = () => {
    return (
        <main>
            <h1
                className="fixed top-[10px] left-[10px] z-[1] m-4 text-3xl font-bold"
            >Anarctism</h1>
            <Canvas />
        </main>
    )
}

export default Home;