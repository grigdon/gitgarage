import { Modal } from "../components/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Maintenance } from "../types/maintenance.ts";
import "../components_css/Modal.css"
interface AddMaintenanceModalProps {
    isOpen: boolean;
    onSubmit: SubmitHandler<Maintenance>;
    onCancel: (message: string) => void;
    onClose: () => void;
}


export const AddMaintenanceModal: React.FC<AddMaintenanceModalProps> = ({ isOpen, onSubmit, onCancel, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Maintenance>();


    const handleModalSubmit = () => {
        handleSubmit(onSubmit)();
    };


    if (!isOpen) return null;


    return (
        <Modal onSubmit={handleModalSubmit} onCancel={onCancel} onClose={onClose}>
            <div className="form-container">
                <h2>Add Maintenance Item</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="maintenance-form">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            {...register("date", { required: "Date is required" })}
                            className="form-input"
                        />
                        {errors.date && <span className="error">{errors.date.message}</span>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className="form-input"
                        />
                        {errors.description && <span className="error">{errors.description.message}</span>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="cost">Cost ($)</label>
                        <input
                            id="cost"
                            type="number"
                            step="0.01"
                            {...register("cost", { required: "Cost is required", min: { value: 0, message: "Cost must be positive" } })}
                            className="form-input"
                        />
                        {errors.cost && <span className="error">{errors.cost.message}</span>}
                    </div>
                </form>
            </div>
        </Modal>
    );
};


export default AddMaintenanceModal;
