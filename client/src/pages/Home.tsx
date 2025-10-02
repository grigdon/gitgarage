import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddCarModal } from "../components/AddCarModal";
import { Heatmap } from "../components/Heatmap.tsx";
import { Car } from "../types/Car.ts";
import { apiService } from "../services/ApiService";
import "../pages_css/Home.css";
import "../index.css";
import plusIcon from "../../src/assets/square-plus-regular.svg";

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const fetchedCars = await apiService.getCars();
        setCars(fetchedCars);
      } catch (error) {
        setMessage("Error fetching cars. Please try again.");
        console.error("Failed to fetch cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const onSubmit = async (data: Car) => {
    try {
      const addedCar = await apiService.addOrUpdateCar(data);
      setCars((prevCars) => [...prevCars, addedCar]);
      setMessage("Car added successfully!");
      setModalOpen(false);
    } catch (error) {
      setMessage("Failed to add car. Please try again.");
      console.error("Error adding car:", error);
    }
  };

  const handleCancel = (message: string) => {
    setModalOpen(false);
    setMessage(message);
  };

  const handleCarClick = (car: Car) => {
    navigate(`/car/${car.nickname}/maintenance`);
  };

  const renderCarTile = (car: Car) => (
    <div
      key={car.id}
      className="tile"
      onClick={() => handleCarClick(car)}
      style={{ cursor: 'pointer' }}
    >
      <h3>{car.nickname}</h3>
      <div className="car-details">
        <p><strong>{car.year} {car.make} {car.model}</strong></p>
        <p>Trim: {car.trim}</p>
        <p>Engine: {car.engine}</p>
        <p>Transmission: {car.transmission}</p>
      </div>
    </div>
  );

  return (
    <div className="index-container">
      {message && <div className="message">{message}</div>}
      
      <button className="btn-add-car" onClick={() => setModalOpen(true)}>
        <img className="car-image" src={plusIcon} alt="Add Car" />
      </button>

      <div className="tile-row">
        {isLoading ? (
          <div>Loading cars...</div>
        ) : cars.length > 0 ? (
          cars.slice(0, 4).map(renderCarTile)
        ) : (
          <div>No cars found</div>
        )}
      </div>

      <AddCarModal
        isOpen={modalOpen}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        onClose={() => setModalOpen(false)}
      />

      <div className="heatmap-container">
        <Heatmap />
      </div>
    </div>
  );
}

export default Home;