
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Network, Users, TrendingUp, Globe, Linkedin, Mail, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for network stats
const connectionsByIndustry = [
  { name: 'Technology', value: 45 },
  { name: 'Finance', value: 20 },
  { name: 'Healthcare', value: 15 },
  { name: 'Education', value: 10 },
  { name: 'Other', value: 10 }
];

const connectionsByRole = [
  { name: 'Software Engineer', value: 35 },
  { name: 'Product Manager', value: 18 },
  { name: 'Designer', value: 15 },
  { name: 'Data Scientist', value: 12 },
  { name: 'Executive', value: 10 },
  { name: 'Other', value: 10 }
];

const reachStats = [
  { name: '1st', connections: 214 },
  { name: '2nd', connections: 1825 },
  { name: '3rd+', connections: 8760 }
];

const COLORS = ['#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#818CF8', '#93C5FD'];

interface Connection {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  mutualConnections: number;
  recentActivity: string;
  profileStrength: number;
}

const NetworkAnalysis: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const sampleConnections: Connection[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      industry: 'Technology',
      mutualConnections: 15,
      recentActivity: '2 weeks ago',
      profileStrength: 85
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Product Manager',
      company: 'Digital Solutions Ltd.',
      industry: 'Technology',
      mutualConnections: 8,
      recentActivity: '1 month ago',
      profileStrength: 75
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'Startup Ventures',
      industry: 'Technology',
      mutualConnections: 23,
      recentActivity: '3 days ago',
      profileStrength: 95
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      company: 'WebDesign Co.',
      industry: 'Technology',
      mutualConnections: 12,
      recentActivity: '1 week ago',
      profileStrength: 70
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'Analytics Partners',
      industry: 'Finance',
      mutualConnections: 6,
      recentActivity: '1 month ago',
      profileStrength: 80
    }
  ];
  
  const [recommendations] = useState<Connection[]>(sampleConnections);
  
  const filteredRecommendations = recommendations.filter(connection => 
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleConnectLinkedIn = async () => {
    setIsLoading(true);
  
    const res = await fetch('http://localhost:5000/linkedin/login');
    const data = await res.json();
    window.location.href = data.auth_url;
  };
  
  
  
  const handleDisconnect = () => {
    setIsConnected(false);
    
    toast({
      title: "LinkedIn Disconnected",
      description: "Your LinkedIn profile has been disconnected.",
    });
  };
  
  const handleContactRecommendation = (name: string) => {
    toast({
      title: "Recommendation Saved",
      description: `You've saved ${name} to your contacts list.`,
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="page-header">Network Analysis</h1>
        
        {!isConnected ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-primary" />
                Connect Your LinkedIn Profile
              </CardTitle>
              <CardDescription>
                Link your LinkedIn account to analyze your professional network and get personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-6 text-center">
                  <Linkedin className="h-16 w-16 text-[#0077B5] mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Unlock Network Insights</h3>
                  <p className="text-gray-600 max-w-md">
                    Connect your LinkedIn profile to visualize your network, identify key connections, and discover new opportunities.
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={handleConnectLinkedIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Linkedin className="h-5 w-5" />
                      Connect with LinkedIn
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Connected</Badge>
                <span className="text-sm text-gray-500">LinkedIn profile synced</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                Disconnect Account
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Network Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">214</div>
                    <p className="text-gray-500">Direct Connections</p>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm font-medium flex justify-between mb-1">
                      <span>Extended Reach</span>
                      <span>10,799 professionals</span>
                    </div>
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-primary h-full" style={{ width: '16.7%' }}></div>
                        <div className="bg-purple-400 h-full" style={{ width: '16.9%' }}></div>
                        <div className="bg-indigo-300 h-full" style={{ width: '66.4%' }}></div>
                      </div>
                    </div>
                    
                    <div className="flex mt-2 text-xs justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                        <span>1st (214)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
                        <span>2nd (1,825)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-300 mr-1"></div>
                        <span>3rd+ (8,760)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Industry Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={connectionsByIndustry}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {connectionsByIndustry.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                    {connectionsByIndustry.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="truncate">{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Network Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-500">+18%</div>
                    <p className="text-gray-500 text-sm">Growth in the past 6 months</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium flex justify-between mb-1">
                        <span>New Connections</span>
                        <span className="text-green-500">+32</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium flex justify-between mb-1">
                        <span>Engagement Rate</span>
                        <span className="text-amber-500">+5%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium flex justify-between mb-1">
                        <span>Profile Views</span>
                        <span className="text-green-500">+23%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="recommendations" className="mb-6">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="recommendations" className="flex-1">Connection Recommendations</TabsTrigger>
                <TabsTrigger value="analysis" className="flex-1">Detailed Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Recommended Connections</CardTitle>
                        <CardDescription>People you may want to connect with based on your profile and industry.</CardDescription>
                      </div>
                      <div className="w-64">
                        <Input
                          placeholder="Search recommendations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredRecommendations.length > 0 ? (
                        filteredRecommendations.map((connection) => (
                          <div key={connection.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-semibold text-lg">{connection.name}</h3>
                              <p className="text-gray-600">{connection.role} at {connection.company}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline">{connection.industry}</Badge>
                                <span className="text-sm text-gray-500">{connection.mutualConnections} mutual connections</span>
                                <span className="text-xs text-gray-400">Active {connection.recentActivity}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex gap-1"
                                onClick={() => handleContactRecommendation(connection.name)}
                              >
                                <Users className="h-4 w-4" />
                                Save Contact
                              </Button>
                              <Button 
                                size="sm"
                                className="flex gap-1"
                              >
                                <Mail className="h-4 w-4" />
                                Message
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No recommendations match your search criteria.
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      Refresh Recommendations
                    </Button>
                    <Button className="flex gap-2" onClick={() => window.open('https://www.linkedin.com', '_blank')}>
                      <Linkedin className="h-4 w-4" />
                      Go to LinkedIn
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Connection by Role
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={connectionsByRole}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366F1" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        Network Reach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={reachStats}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="connections" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">What this means</h3>
                        <p className="text-sm text-gray-600">
                          Your network extends to over 10,000 professionals. This gives you significant reach within your industry.
                          Consider leveraging your 2nd-degree connections for introductions to potential employers or partners.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Network Optimization Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Diversify Your Industry Connections</h3>
                            <p className="text-sm text-gray-600">
                              45% of your connections are in Technology. Consider expanding into related fields like Finance (FinTech) or Healthcare (HealthTech) to broaden your opportunities.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-primary">View strategy →</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Strengthen Key Relationships</h3>
                            <p className="text-sm text-gray-600">
                              You have 15 connections at companies you're interested in, but limited engagement. Increase meaningful interactions with these contacts.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-primary">View strategy →</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Globe className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Target High-Value Connections</h3>
                            <p className="text-sm text-gray-600">
                              Based on your career goals, we've identified 25 potential connections who could significantly impact your career growth.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-primary">View connections →</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default NetworkAnalysis;
