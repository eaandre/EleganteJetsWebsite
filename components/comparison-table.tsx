import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const comparisonData = [
    { feature: 'Customization', privateCharter: 'Fully customizable', groupCorporate: 'Tailored to group needs', airAmbulance: 'Specialized medical equipment' },
    { feature: 'Capacity', privateCharter: '1-19 passengers', groupCorporate: '20+ passengers', airAmbulance: 'Patient + medical staff' },
    { feature: 'Concierge Services', privateCharter: 'Premium', groupCorporate: 'Available', airAmbulance: 'Medical-focused' },
    { feature: 'Catering', privateCharter: 'Gourmet options', groupCorporate: 'Group catering available', airAmbulance: 'Special dietary needs' },
    { feature: 'Booking Flexibility', privateCharter: 'On-demand', groupCorporate: 'Scheduled', airAmbulance: 'Emergency response' },
  ]
  
  export function ComparisonTable() {
    return (
      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Service Comparison</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>Private Charter</TableHead>
                  <TableHead>Group & Corporate</TableHead>
                  <TableHead>Air Ambulance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.privateCharter}</TableCell>
                    <TableCell>{row.groupCorporate}</TableCell>
                    <TableCell>{row.airAmbulance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    )
  }
  
  