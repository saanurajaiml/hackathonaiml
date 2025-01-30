import React, { useState } from 'react';
import { Upload, File, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PlasticClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [classification, setClassification] = useState(null);
  const [databaseSummary, setDatabaseSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data to simulate backend response
  const mockClassification = {
    plastic_type: "High-Density Polyethylene (HDPE)",
    recycling_code: "2",
    recycling_method: "Recycled into new bottles, containers, and products like pipes.",
    recycling_process: [
      "Collection of HDPE plastic waste",
      "Cleaning to remove impurities",
      "Shredding into small pieces",
      "Melting and forming into new products"
    ]
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      
      // Simulate classification process
      setLoading(true);
      setTimeout(() => {
        setClassification(mockClassification);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Plastic Waste Classification System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <label 
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileSelect}
              />
            </label>

            {/* Preview Section */}
            {previewUrl && (
              <div className="w-full max-w-md">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Classification Results */}
          {classification && !loading && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Classification Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold">Plastic Type:</h3>
                    <p>{classification.plastic_type}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Recycling Code:</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                        {classification.recycling_code}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Recycling Method:</h3>
                    <p>{classification.recycling_method}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Recycling Process:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {classification.recycling_process.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Alert */}
          <Alert>
            <AlertDescription>
              This is a demo interface. In a production environment, it would connect to the Python backend for real image classification.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlasticClassifier;