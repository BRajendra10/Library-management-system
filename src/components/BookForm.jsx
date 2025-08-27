import { useFormik } from "formik";
import { object, string, number, date } from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBook } from "react-icons/fa";

const schema = object({
    title: string().required("Title is required"),
    author: string().required("Author is required"),
    publisher: string().required("Publisher is required"),
    isbn: string().required("ISBN is required"),
    status: string().oneOf(["Available", "Borrowed", "Damaged", "Missing"]).required(),
    description: string().required("Description is required"),
    keywords: string().required("Keywords are required"),
    edition: string().nullable(),
    series: string().nullable(),
    language: string().required("Language is required"),
    pageNo: number().positive().integer().required("Page number required"),
    publishDate: date().required("Publish date required"),
    addedDate: date().required("Added date required"),
    cost: number().positive().required("Cost is required"),
    callNumber: string().required("Call number is required"),
    department: string().required("Department is required"),
    subject: string().required("Subject is required"),
    coverImage: string().url("Invalid URL").required("Cover image is required"),
});

const BookForm = ({ initialBook }) => {
    const navigate = useNavigate();
    const { books } = useSelector((state) => state.books);

    const formik = useFormik({
        initialValues: initialBook || {
            title: "",
            author: "",
            publisher: "",
            bookId: books.length + 1,
            isbn: "",
            status: "Available",
            description: "",
            keywords: "",
            edition: "",
            series: "",
            language: "English",
            pageNo: "",
            publishDate: "",
            addedDate: new Date().toISOString().split("T")[0],
            cost: "",
            callNumber: "",
            department: "",
            subject: "",
            coverImage: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitted Book:", values);
            navigate("/books");
        },
    });

    const { errors, touched, handleChange, values, handleSubmit } = formik;

    // Reusable Field
    const InputField = ({ label, name, type = "text", ...rest }) => (
        <div className="flex flex-col">
            <label className="my-1 text-sm font-medium">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={values[name]}
                onChange={handleChange}
                className="p-2 border border-stone-400 rounded-md"
                {...rest}
            />
            {errors[name] && touched[name] && (
                <span className="text-sm text-red-600">{errors[name]}</span>
            )}
        </div>
    );

    const SelectField = ({ label, name, options, ...rest }) => (
        <div className="flex flex-col">
            <label className="my-1 font-medium">{label}</label>
            <select
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                className="p-2 border border-stone-400 rounded-md my-1"
                {...rest}
            >
                <option value="">Select {label}</option>
                {options.map((op) => (
                    <option key={op} value={op}>
                        {op}
                    </option>
                ))}
            </select>
            {errors[name] && touched[name] && (
                <span className="text-sm text-red-600">{errors[name]}</span>
            )}
        </div>
    );

    const TextAreaField = ({ label, name }) => (
        <div className="flex flex-col col-span-2">
            <label className="mb-1 font-medium">{label}</label>
            <textarea
                id={name}
                name={name}
                rows="3"
                value={values[name]}
                onChange={handleChange}
                className="p-2 border border-stone-400 rounded-md"
            />
            {errors[name] && touched[name] && (
                <span className="text-sm text-red-600">{errors[name]}</span>
            )}
        </div>
    );

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-stone-100 p-6 overflow-y-auto">
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {initialBook ? "Update Book" : "Add New Book"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-3 gap-4"
                >
                    {/* Book Info */}
                    <div>
                        <InputField label="Title" name="title" />
                        <InputField label="Author" name="author" />
                        <InputField label="Publisher" name="publisher" />
                        <InputField label="ISBN" name="isbn" />
                        <InputField label="Series" name="series" />
                        <InputField label="Subject" name="subject" />
                    </div>

                    {/* Library Info */}
                    <div>
                        <SelectField label="Status" name="status" options={["Available", "Borrowed", "Damaged", "Missing"]} />
                        <InputField label="Edition" name="edition" />
                        <InputField label="Department" name="department" />
                        <InputField label="Call Number" name="callNumber" />
                        <InputField label="Book ID" name="  "/>
                        <InputField label="Added Date" name="addedDate" type="date" />
                    </div>

                    {/* Details */}
                    <div className="col-span-2">
                        <TextAreaField label="Description" name="description" />
                        <InputField label="Keywords" name="keywords" />
                        <InputField label="Language" name="language" />
                        <InputField label="Page No." name="pageNo" type="number" />
                        <InputField label="Publish Date" name="publishDate" type="date" />
                        <InputField label="Cost (₹)" name="cost" type="number" />
                    </div>

                    {/* Media */}
                    {/* <InputField label="Cover Image URL" name="coverImage" className="col-span-2" /> */}

                    {/* Submit */}
                    <div className="col-span-4 flex justify-end mt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-md"
                        >
                            <FaBook /> {initialBook ? "Update Book" : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
