import Container from "../components/layout/Container"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function IndexPage() {
  return (
    <Container>
      <Header />
      <a
        href="https://news.ycombinator.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="btn btn-secondary mt-3 w-full justify-center font-semibold"
      >
        <span className="py-1 text-base font-semibold">
          View on Hacker News
        </span>
      </a>
      <Footer />
    </Container>
  )
}
