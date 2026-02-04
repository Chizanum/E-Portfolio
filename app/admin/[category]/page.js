"use client";

import { useState, useEffect } from "react";
// import { useParams } from "next/navigation"; // useParams is not available in server components page, but this is a client component? No, page.js in app router receives params as prop.
// Actually, 'use client' is needed for hooks.
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const SCHEMAS = {
    learning: {
        title: "Currently Learning",
        fields: [
            { name: "topic", label: "Topic", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "status", label: "Status", type: "select", options: ["exploring", "practicing", "applying", "building"] },
            { name: "insights", label: "Insights/Notes", type: "textarea" },
        ],
    },
    weekly: {
        title: "Weekly Learnings",
        fields: [
            { name: "id", label: "Week ID (e.g., week-5)", type: "text" },
            { name: "date", label: "Date", type: "date" },
            { name: "learnings", label: "Learnings", type: "array" }, // Special handling
        ],
    },
    concepts: {
        title: "Concepts Finally Understood",
        fields: [
            { name: "title", label: "Concept Title", type: "text" },
            { name: "explanation", label: "Explanation", type: "textarea" },
            { name: "confusion", label: "Why was it confusing?", type: "textarea" },
            { name: "click", label: "What made it click?", type: "textarea" },
            { name: "example", label: "Code Example", type: "code" },
        ],
    },
    projects: {
        title: "Mini Projects",
        fields: [
            { name: "title", label: "Project Title", type: "text" },
            { name: "goal", label: "Goal", type: "textarea" },
            { name: "tools", label: "Tools Used (comma separated)", type: "text" }, // Simple comma sep for now
            { name: "learned", label: "What I Learned", type: "textarea" },
            { name: "link", label: "Link URL", type: "url" },
        ],
    },
};

export default function AdminEditor() {
    const params = useParams();
    const category = params.category;
    const schema = SCHEMAS[category];

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState(-1); // -1 means list view, >= 0 means editing item
    const [isNew, setIsNew] = useState(false);

    // Form setup
    const { register, handleSubmit, reset, setValue, control, watch } = useForm();

    // Load data
    useEffect(() => {
        if (!category) return;
        fetch(`/api/content?file=${category}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [category]);

    const handleEdit = (index) => {
        const item = items[index];
        // Special handling for array/comma fields if needed
        if (category === 'projects' && Array.isArray(item.tools)) {
            item.tools = item.tools.join(', ');
        }
        reset(item);
        setEditingIndex(index);
        setIsNew(false);
    };

    const handleAddNew = () => {
        reset({});
        setEditingIndex(items.length); // Temporary index
        setIsNew(true);
    };

    const handleSave = async (data) => {
        let newItems = [...items];

        // Process special fields
        if (category === 'projects' && typeof data.tools === 'string') {
            data.tools = data.tools.split(',').map(t => t.trim());
        }
        if (category === 'weekly' && typeof data.learnings === 'string') {
            // This is tricky without field array. Let's make 'learnings' a textarea for now split by newline
            data.learnings = data.learnings.split('\n').filter(l => l.trim() !== '');
        }

        if (isNew) {
            // Add ID if missing
            if (!data.id) data.id = Date.now().toString();
            newItems.push(data);
        } else {
            newItems[editingIndex] = { ...newItems[editingIndex], ...data };
        }

        setItems(newItems);
        setEditingIndex(-1); // Return to list

        // Persist to file
        await fetch("/api/content", {
            method: "POST",
            body: JSON.stringify({ file: category, data: newItems }),
        });
    };

    const handleDelete = async (index) => {
        if (!confirm("Are you sure?")) return;
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        await fetch("/api/content", {
            method: "POST",
            body: JSON.stringify({ file: category, data: newItems }),
        });
    };

    if (!schema) return <div className="p-8">Invalid Category</div>;
    if (loading) return <div className="p-8"><span className="loading loading-spinner"></span> Loading...</div>;

    // --- EDITOR VIEW ---
    if (editingIndex !== -1) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setEditingIndex(-1)} className="btn btn-ghost btn-circle">
                        <ArrowLeft />
                    </button>
                    <h2 className="text-2xl font-bold">{isNew ? "New Entry" : "Edit Entry"}</h2>
                </div>

                <form onSubmit={handleSubmit(handleSave)} className="space-y-4 max-w-2xl bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
                    {schema.fields.map((field) => (
                        <div key={field.name} className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">{field.label}</span>
                            </label>

                            {field.type === 'textarea' || field.type === 'code' ? (
                                <textarea
                                    {...register(field.name)}
                                    className="textarea textarea-bordered h-32 font-mono text-sm"
                                    placeholder={`Enter ${field.label}...`}
                                />
                            ) : field.type === 'select' ? (
                                <select {...register(field.name)} className="select select-bordered">
                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : field.type === 'array' ? (
                                <textarea
                                    {...register(field.name)}
                                    className="textarea textarea-bordered h-32"
                                    placeholder="Enter items separated by new lines"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    {...register(field.name)}
                                    className="input input-bordered"
                                />
                            )}
                        </div>
                    ))}

                    <div className="pt-4 flex gap-2">
                        <button type="submit" className="btn btn-primary gap-2"><Save size={16} /> Save Changes</button>
                        <button type="button" onClick={() => setEditingIndex(-1)} className="btn btn-ghost">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    // --- LIST VIEW ---
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold capitalize">{schema.title}</h1>
                    <p className="text-base-content/60">Manage your items below.</p>
                </div>
                <button onClick={handleAddNew} className="btn btn-primary gap-2">
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="card bg-base-100 border border-base-200 hover:border-primary/30 transition-colors p-4 flex flex-row justify-between items-center group">
                        <div>
                            <h3 className="font-bold text-lg">
                                {item.title || item.topic || item.id || "Untitled"}
                            </h3>
                            <p className="text-sm text-base-content/60 truncate max-w-md">
                                {item.description || item.goal || item.date || item.explanation}
                            </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(idx)} className="btn btn-sm btn-ghost">Edit</button>
                            <button onClick={() => handleDelete(idx)} className="btn btn-sm btn-ghost text-error hover:bg-error/10"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-20 bg-base-100/50 rounded-xl border border-dashed border-base-300">
                        <p className="text-base-content/50">No items yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
