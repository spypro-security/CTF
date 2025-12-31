function Home() {
  const styles = {
    hero: {
      width: "100%",
      minHeight: "calc(100vh - var(--nav-height))",
      backgroundImage:
        'url("https://tse2.mm.bing.net/th/id/OIP.qDURoX7SZ2Dg0LJuA4aGggHaEK?pid=Api&P=0&h=180")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
    },

    /* FULL IMAGE OVERLAY */
    overlay: {
      minHeight: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },

    heading: {
      color: "bisque",
      fontSize: "4rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      letterSpacing: "3px",
    },

    paragraph: {
      color: "violet",
      fontSize: "1.5rem",
      marginBottom: "1.5rem",
    },

    tag: {
      color: "white",
      fontSize: "1.1rem",
      letterSpacing: "2px",
      opacity: 0.9,
    },
  };

  return (
    <section className="page-top-cover" style={styles.hero}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>CAPTURE THE FLAG</h1>
        <p style={styles.paragraph}>
          Crack the puzzle, capture the flag
        </p>
        <span style={styles.tag}>PROMETEO'26</span>
      </div>
    </section>
  );
}

export default Home;
