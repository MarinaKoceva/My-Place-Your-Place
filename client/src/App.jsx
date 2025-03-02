import './App.css';
import Blog from './components/Blog';
import Explore from './components/Explore';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import HowItWorks from './components/HowItWorks';
import ListTopics from './components/ListTopics';
import Navigarion from './components/Navigation';
import Reviews from './components/Reviews';
import Statistics from './components/Statistics';
import Subscription from './components/Subscription';

function App() {
  return (
    <>
      <Header />

      <Navigarion />

      <Home />

      <ListTopics />

      <HowItWorks />

      <Explore />

      <Reviews />

      <Statistics />

      <Blog />

      <Subscription />

      <Footer />

    </>
  )
}

export default App
