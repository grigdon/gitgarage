import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Maintenance } from "../types/maintenance.ts";
import { AddMaintenanceModal } from "../components/AddMaintenanceModal";
import "../pages_css/CarProfile.css";


export function CarProfile() {
    const { nickname } = useParams<{ nickname: string }>();
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [maintenanceItems, setMaintenanceItems] = useState<Maintenance[]>([]);
    const { reset } = useForm<Maintenance>();


    const onSubmit: SubmitHandler<Maintenance> = (data) => {
        setMaintenanceItems(prevItems => [...prevItems, data]);
        setMessage("Maintenance item added!");
        setModalOpen(false);
    };


    const handleCancel = (message: string) => {
        setModalOpen(false);
        setMessage(message);
    };


    return (
        <div className="index-container">
            {message && <div className="message">{message}</div>}


            <button className="btn-add-car" onClick={() => setModalOpen(true)}>
                Add Maintenance Item
            </button>


            <AddMaintenanceModal
                isOpen={modalOpen}
                onSubmit={onSubmit}
                onCancel={handleCancel}
                onClose={() => {
                    setModalOpen(false);
                    reset();
                }}
            />
        </div>
    );
}


export default CarProfile;
