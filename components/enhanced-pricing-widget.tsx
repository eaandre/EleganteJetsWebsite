"use client"

import React, { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import format from "date-fns/format"
import { parseISO } from "date-fns"
import { CalendarIcon, Plane, Car, Plus, Trash2 } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const legSchema = z.object({
  from: z.string().min(2, { message: "From location is required" }),
  to: z.string().min(2, { message: "To location is required" }),
  date: z.date({ required_error: "Date is required" }),
})

const formSchema = z.object({
  tripType: z.enum(["jet charter", "car rental"]),
  legs: z.array(legSchema).min(1, { message: "At least one leg is required" }),
  pickupLocation: z.string().optional(),
  dropoffLocation: z.string().optional(),
  pickupDateTime: z.date().optional(),
  returnDateTime: z.date().optional(),
  preferredCarType: z.string().optional(),
  additionalRequests: z.string().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }).regex(/^\d+$/, { message: "Phone number must be numeric" }),
})

const jetTypes = ["Light Jet", "Midsize Jet", "Heavy Jet"]
const carTypes = ["Sedan", "SUV", "Van", "Super Car", "Limousine"]

export function EnhancedPricingWidget() {
  const [tripType, setTripType] = useState<"jet charter" | "car rental">("jet charter")
  const [showContactFields, setShowContactFields] = useState(false)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)
  const [showReturnDateInput, setShowReturnDateInput] = useState(false)

  const getDefaultValues = () => ({
    tripType,
    legs: [{ from: "", to: "", date: null }],
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: new Date(),
    returnDateTime: new Date(),
    preferredCarType: "",
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
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const allLegsFilled = fields.every((_, index) => {
        return (
          !!form.getValues(`legs.${index}.from`) &&
          !!form.getValues(`legs.${index}.to`) &&
          !!form.getValues(`legs.${index}.date`)
        );
      });

      // Check if passenger count is filled
      const passengerCountFilled = !!form.getValues("passengerCount");

      // Check if car rental fields are filled
      const vehicleLocationFilled = !!form.getValues("vehicleLocation");
      const pickupDateTimeFilled = !!form.getValues("pickupDateTime");
      const returnDateTimeFilled = !!form.getValues("returnDateTime");

      // Set showContactFields only if all conditions are met
      setShowContactFields(
        (tripType === "jet charter" && allLegsFilled && passengerCountFilled) ||
        (tripType === "car rental" && vehicleLocationFilled && pickupDateTimeFilled && returnDateTimeFilled)
      );
    });
    return () => subscription.unsubscribe();
  }, [form, fields, tripType]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send this data to your backend or a third-party API
    setShowThankYouMessage(true);
    form.reset();
    localStorage.removeItem('formData');
    setTimeout(() => {
      setShowThankYouMessage(false);
    }, 5000);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-card-foreground">Request Your Personalized Travel Quote</CardTitle>
        <CardDescription className="text-card-foreground">Experience seamless luxury tailored to your needs. Select your journey type and preferences, and we’ll provide a personalized quote for your exclusive travel experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jet charter" onValueChange={(value) => setTripType(value as "jet charter" | "car rental")}>
          <TabsList className="grid w-full grid-cols-1 bg-muted border border-border rounded-t-md">
            <TabsTrigger 
              value="jet charter" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tl-md"
              onClick={() => form.reset(getDefaultValues())}
            >
              Private Jet Charter
            </TabsTrigger>
            <TabsTrigger 
              value="car rental" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tl-md"
              onClick={() => form.reset(getDefaultValues())}
            >
              Luxury Car Rental
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
              <TabsContent value="jet charter">
                <JetCharterForm 
                  form={form} 
                  fields={fields} 
                  append={append} 
                  remove={remove} 
                  showReturnDateInput={showReturnDateInput} 
                  setShowReturnDateInput={setShowReturnDateInput} 
                  setShowContactFields={setShowContactFields}
                />
              </TabsContent>
              <TabsContent value="car rental">
                <CarRentalForm form={form} />
              </TabsContent>
              {showContactFields && <ContactFields form={form} />}
              <div className="flex justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="submit" 
                        className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors font-semibold py-2 px-4 rounded-md"
                      >
                        {tripType === "car rental" ?
                          <><Car className="mr-2 h-4 w-4" /> Request My Quote</> :
                          <><Plane className="mr-2 h-4 w-4" /> Request My Quote</>
                        }
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
  )
}

function JetCharterForm({ form, fields, append, remove, showReturnDateInput, setShowReturnDateInput, setShowContactFields }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>, fields: { id: string; from: string; to: string; date: Date | null }[], append: (value: { from: string; to: string; date: Date }) => void, remove: (index: number) => void, showReturnDateInput: boolean, setShowReturnDateInput: (value: boolean) => void, setShowContactFields: (value: boolean) => void }) {
  return (
    <div className="space-y-6">
      {fields.map((field: { id: string; from: string; to: string; date: Date | null }, index: number) => (
        <div key={field.id} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {fields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Leg {index + 1}
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ from: "", to: "", date: null })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Leg
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => {
          setShowReturnDateInput(true);
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Return Trip
      </Button>
      <FormField
        control={form.control}
        name="passengerCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passenger Count</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of passengers" {...field} min={1} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {showReturnDateInput && (
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="additionalDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Details</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional details or requests" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ContactFields form={form} />
    </div>
  )
}

function CarRentalForm({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  const [customCarType, setCustomCarType] = useState("");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="vehicleLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Operation Area or Destination</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Abuja, Lagos, or specify routes." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pickupDateTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pickup Date & Time</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="returnDateTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Return Date & Time</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preferredCarType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Your Preferred Car Type</FormLabel>
            <div className="flex flex-col">
              <Select onValueChange={(value) => {
                field.onChange(value);
                setCustomCarType(""); // Clear custom input when a selection is made
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Or enter your preferred car type" 
                value={customCarType} 
                onChange={(e) => {
                  setCustomCarType(e.target.value);
                  field.onChange(e.target.value); // Update form value with custom input
                }} 
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests or Services</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="e.g., Chauffeur service, security detail, or customized amenities." 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ContactFields form={form} />
    </div>
  )
}

function ContactFields({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
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
              <Input type="email" placeholder="Enter your email address" {...field} />
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
              <Input placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

