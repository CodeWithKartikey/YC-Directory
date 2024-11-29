'use client';

import { z } from 'zod';

import React, { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Send } from 'lucide-react';

import MDEditor from '@uiw/react-md-editor';

import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { createPitch } from '@/lib/action';
import { uploadToCloudinary } from '@/lib/utils';
import { formSchema } from '@/lib/validationForm';

const StartUpForm = () => {

  const router = useRouter();
  const { toast } = useToast();
  const [pitch, setPitch] = useState();
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file?.type)) {
      toast({
        title: "Invalid File",
        description: "Only JPG, JPEG, or PNG files are allowed.",
        variant: "destructive",
      });
      return;
    }
    if (file?.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must not exceed 5MB.",
        variant: "destructive",
      });
      return;
    }
    try {
      const uploadedImage = await uploadToCloudinary(file);
      if (uploadedImage?.secure_url) {
        setImage(uploadedImage?.secure_url);
      } else {
        throw new Error("Image upload failed, no URL returned.");
      }
    } catch (error) {
      console.error("Image upload error:", error?.message);
    }
  };
  const handleSubmit = async (prevState, formData) => {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        image,
        pitch
      };
      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, image, pitch);
      if(result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Pitch created successfully.",
          variant: "success"
        });
        router.push(`/startup/${result?.slug?.current}`);
        return { errors: "", status: "SUCCESS" };
      }
    } catch (error) {
      if(error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
        toast({
          title: "Error",
          description: "Please check your inputs and try again.",
          variant: "destructive"
        });
        return { ...prevState, errors: "Validation failed.", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive"
      });
      return { ...prevState, errors: error?.message, status: "ERROR" };
    }
  };
  const [state, formAction, isPending] = useActionState(handleSubmit, { errors: "", status: "INITIAL" });
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" type="text" name="title" className="startup-form_input" placeholder="Enter your startup title" required />
        {errors.title && <p className="startup_form-error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" type="text" name="description" className="startup-form_textarea" placeholder="Describe your startup" required />
        {errors.description && <p className="startup_form-error">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input id="category" type="text" name="category" className="startup-form_input" placeholder="Startup category (Tech, Health, Education ...)" required />
        {errors.category && <p className="startup_form-error">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="image" className="startup-form_label">Image URL</label>
        <Input 
          id="image" 
          type="file" 
          name="image" 
          accept="image/*"
          className="startup-form_input"
          placeholder="Upload image of your startup"
          onChange={handleImage}
          required 
        />
        {errors.image && <p className="startup_form-error">{errors.image}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor
          id="pitch"
          value={pitch}
          onChange={(value) => setPitch(value)}
          className="startup-form_editor"
          preview="edit"
          textareaProps={{
            placeholder: "Share your pitch here about your startup and the problem it addresses.",
            required: true,
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.pitch && <p className="startup_form-error">{errors.pitch}</p>}
      </div>
      <Button 
        type="submit" 
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your pitch"}
        <Send className="w-6 h-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartUpForm;