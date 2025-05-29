"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useContactForm, ContactFormData } from "@/hooks/use-contact"

const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateAsync } = useContactForm()
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      await mutateAsync(data)
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white py-16 md:py-24" id="contact">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Need help? Reach out to our support team.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Get In Touch</h3>
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-navyblue-500 mr-3" />
                  <a href="mailto:support@capp.to" className="text-gray-700 hover:text-navyblue-600">
                    support@capp.to
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Connect With Developer</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/DevChiJay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-navyblue-100 text-gray-700 hover:text-navyblue-600 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/DevChiJay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-navyblue-100 text-gray-700 hover:text-navyblue-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/chiemela-james-3681b5246/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-navyblue-100 text-gray-700 hover:text-navyblue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-2">Office Hours</h3>
                <p className="text-gray-600 mb-4">Monday - Friday: 9AM - 5PM</p>
                <p className="text-gray-600">
                  We strive to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-medium mb-6">Send us a message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
