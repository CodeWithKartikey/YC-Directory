'use client';

import { z } from 'zod';

import React, { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';

import { Send } from 'lucide-react';

import MDEditor from '@uiw/react-md-editor';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { createPitch } from '@/lib/action';
import { formSchema } from '@/lib/validationForm';

const StartUpForm = () => {

  const router = useRouter();
  const { toast } = useToast();

  const [pitch, setPitch] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (prevState, formData) => {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        image: formData.get("image"),
        pitch
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      console.log(result);
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
        description: error.message,
        variant: "destructive"
      });
      return { ...prevState, errors: error.message, status: "ERROR" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, { errors: "", status: "INITIAL" });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" name="title" className="startup-form_input" placeholder="Enter your startup title" required />
        {errors.title && <p className="startup_form-error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" placeholder="Describe your startup" required />
        {errors.description && <p className="startup_form-error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input id="category" name="category" className="startup-form_input" placeholder="Startup category (Tech, Health, Education ...)" required />
        {errors.category && <p className="startup_form-error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="image" className="startup-form_label">Image URL</label>
        <Input id="image" name="image" className="startup-form_input" placeholder="Startup Image URL" required />
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