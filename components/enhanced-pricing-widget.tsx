/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plane, Car, Plus, Trash2 } from "lucide-react";

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const legSchema = z.object({
  from: z.string().min(2, { message: "From location is required" }),
  to: z.string().min(2, { message: "To location is required" }),
  date: z.date({ required_error: "Date is required" }),
  returnDate: z.date().optional(),
});

const formSchema = z.object({
  tripType: z.enum(["jet charter", "car rental"]),
  legs: z.array(legSchema).min(1, { message: "At least one leg is required" }),
  pickupLocation: z.string().optional(),
  dropoffLocation: z.string().optional(),
  pickupDateTime: z.date().optional(),
  returnDateTime: z.date().optional(),
  preferredCarType: z.string().optional(),
  preferredJetType: z.string().optional(),
  additionalRequests: z.string().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .min(10, { message: "Invalid phone number" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" }),
});

const carTypes = ["Sedan", "SUV", "Van", "Super Car", "Truck"];
//const jetTypes = ["Light Jet", "Mid Jet", "Heavy Jet"];

export function EnhancedPricingWidget() {
  const [tripType, setTripType] = useState<"jet charter" | "car rental">("jet charter");
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const getDefaultValues = () => ({
    tripType,
    legs: [{ from: "", to: "", date: new Date(), returnDate: undefined }],
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: new Date(),
    returnDateTime: new Date(),
    preferredCarType: "",
    preferredJetType: "",
    additionalRequests: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "legs",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch(() => {});
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowThankYouMessage(true);
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzjLTUPxDvM0_UyaUOud5UQ-Diekqxq8LGW5LVCypXq5Djx3fW8eDT_CvPU93Sw2iqK/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-card-foreground">
          Request Your Personalized Travel Quote
        </CardTitle>
        <CardDescription className="text-card-foreground">
          Experience seamless luxury tailored to your needs. Select your journey type and preferences, and we&apos;ll provide a personalized quote for your exclusive travel experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jet charter" onValueChange={(value) => setTripType(value as "jet charter" | "car rental")}>
          <TabsList className="grid w-full grid-cols-2 bg-muted border border-border rounded-t-md">
            <TabsTrigger
              value="jet charter"
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tl-md"
              onClick={() => form.reset(getDefaultValues())}
            >
              Private Jet Charter
            </TabsTrigger>
            <TabsTrigger
              value="car rental"
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tr-md"
              onClick={() => form.reset(getDefaultValues())}
            >
              Luxury Car Rental
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
              <TabsContent value="jet charter">
                <JetCharterForm form={form} fields={fields} append={append} remove={remove} />
              </TabsContent>
              <TabsContent value="car rental">
                <CarRentalForm form={form} />
              </TabsContent>
              <div className="flex justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors font-semibold py-2 px-4 rounded-md"
                      >
                        {tripType === "car rental" ? (
                          <>
                            <Car className="mr-2 h-4 w-4" /> Request My Quote
                          </>
                        ) : (
                          <>
                            <Plane className="mr-2 h-4 w-4" /> Request My Quote
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to receive your personalized luxury quote</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </Form>
        </Tabs>
        {showThankYouMessage && (
          <div className="thank-you-message mt-8">
            <h3 className="text-2xl font-bold mb-2">Thank you for your request!</h3>
            <p className="text-lg">
              Our team will get back to you shortly with a personalized quote for your luxury travel experience.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function JetCharterForm({
  form,
  fields,
  append,
  remove,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>; 
  fields: { 
    id: string; 
    from: string; 
    to: string; 
    date: Date | undefined; 
    returnDate?: Date | undefined; // Marked as optional
  }[]; 
  append: (value: { from: string; to: string; date: Date; returnDate?: Date | undefined }) => void;
  remove: (index: number) => void;
}) {
  const [showReturnFields, setShowReturnFields] = useState<{ [key: string]: boolean }>({});

  // Track the form fields for locations and dates
  const { watch } = form;
  const fromLocations = watch("legs").map((leg) => leg.from);
  const toLocations = watch("legs").map((leg) => leg.to);
  const datesFilled = fromLocations.every((location) => location !== "") && toLocations.every((location) => location !== "");

  const toggleReturn = (fieldId: string) => {
    setShowReturnFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.length > 1 && <p className="col-span-2 font-semibold">Leg {index + 1}</p>}

            <FormField
              control={form.control}
              name={`legs.${index}.from`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter departure location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`legs.${index}.to`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`legs.${index}.date`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departure Date & Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPPpp") : <CalendarIcon className="mr-2 h-4 w-4" />}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || new Date()}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => toggleReturn(field.id)}
                className="flex items-center"
              >
                {showReturnFields[field.id] ? "Remove Return Flight" : "Add Return Flight"}
              </Button>
            </div>

            {showReturnFields[field.id] && (
              <FormField
                control={form.control}
                name={`legs.${index}.returnDate`}
                render={({ field }) => (
                  <FormItem className="flex flex-col md:col-span-2">
                    <FormLabel>Return Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPPpp") : <CalendarIcon className="mr-2 h-4 w-4" />}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || new Date()}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {index > 0 && (
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="destructive"
              size="sm"
              className="mt-2 flex items-center"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remove Leg {index + 1}
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ from: "", to: "", date: new Date(), returnDate: undefined })}
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Leg
      </Button>

      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests or Services</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="e.g., Personalized in-flight catering, ground transportation arrangements, or specific amenities to enhance your journey." 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {datesFilled && <ContactFields form={form} />}
    </div>
  );
}




function CarRentalForm({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}) {
  const pickupLocation = form.watch("pickupLocation");
  const dropoffLocation = form.watch("dropoffLocation");
  const pickupDateTime = form.watch("pickupDateTime");
  const returnDateTime = form.watch("returnDateTime");

  const isContactVisible = pickupLocation && dropoffLocation && pickupDateTime && returnDateTime;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter pickup location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropoffLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dropoff Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter dropoff location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pickup Date & Time */}
        <FormField
          control={form.control}
          name="pickupDateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pickup Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPPpp") : <CalendarIcon className="mr-2 h-4 w-4" />}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single"
                    selected={field.value} 
                    onSelect={field.onChange} 
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Return Date & Time */}
        <FormField
          control={form.control}
          name="returnDateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Return Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPPpp") : <CalendarIcon className="mr-2 h-4 w-4" />}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single"
                    selected={field.value} 
                    onSelect={field.onChange} 
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Preferred Car Type */}
      <FormField
        control={form.control}
        name="preferredCarType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Car Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carTypes.map((type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Requirements */}
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests or Services</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="e.g.,  Bespoke chauffeur services, personal security, or customized vehicle amenities to enhance your experience." 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditionally Render Contact Field */}
      {isContactVisible && <ContactFields form={form} />}
    </div>
  );
}


  function ContactFields({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
    return (
      <div className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  



 