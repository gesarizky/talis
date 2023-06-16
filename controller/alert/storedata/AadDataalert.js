import AlertDb from "@/model/param/Alert";
const AddDataAlert = async (data) => {
    try {
        await AlertDb.upsert(data);
    } catch (error) {
        console.log(error);
    }
}
export default AddDataAlert;