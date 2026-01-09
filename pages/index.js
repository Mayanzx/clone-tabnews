function Home() {
    return (
        <main style={{minHeight: "100vh", display: "grid", placeItems: "center", background: "#fffaf0", fontFamily: "'Helvetica Neue', Arial, sans-serif"}}>
            <section style={{textAlign: "center", padding: "2rem", border: "2px solid #ffe0b5", borderRadius: "16px", background: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,0.08)"}}>
                <p style={{fontSize: "1rem", color: "#b05b3b", letterSpacing: "0.08em", marginBottom: "0.5rem"}}>Para: Laiane</p>
                <h1 style={{fontSize: "2.5rem", margin: "0 0 0.75rem", color: "#d46b42"}}>Eu te amo</h1>
                <p style={{fontSize: "1.1rem", color: "#4b3427", margin: 0}}>
                    Você é a mulher da minha vidinha e sempre vou buscar o seu sorriso.
                </p>
            </section>
        </main>
    );
}

export default Home;