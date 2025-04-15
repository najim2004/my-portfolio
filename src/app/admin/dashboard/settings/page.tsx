"use client";

import { useState, ChangeEvent, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";

export interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
  favicon: string;
  logo: string;
}

export interface AppearanceSettings {
  theme: "purple" | "blue" | "green" | "dark" | "light";
  accentColor: string;
  fontFamily: string;
  enableDarkMode: boolean;
  enableAnimations: boolean;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  twitterHandle: string;
  googleAnalyticsId: string;
}

export interface AdvancedSettings {
  cacheControl: string;
  robotsTxt: string;
  customCss: string;
  customJs: string;
}

export interface Settings {
  general: GeneralSettings;
  appearance: AppearanceSettings;
  seo: SeoSettings;
  advanced: AdvancedSettings;
}

const initialSettings: Settings = {
  general: {
    siteTitle: "Najim | Full Stack Developer",
    siteDescription:
      "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
    favicon: "/favicon.ico",
    logo: "/logo.png",
  },
  appearance: {
    theme: "purple",
    accentColor: "#9333ea",
    fontFamily: "Inter",
    enableDarkMode: true,
    enableAnimations: true,
  },
  seo: {
    metaTitle: "Najim | Full Stack Developer",
    metaDescription:
      "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
    ogImage: "/og-image.jpg",
    twitterHandle: "@najim",
    googleAnalyticsId: "",
  },
  advanced: {
    cacheControl: "public, max-age=3600",
    robotsTxt: "User-agent: *\nAllow: /",
    customCss: "",
    customJs: "",
  },
};

type TabValue = "general" | "appearance" | "seo" | "advanced";

export default function SettingsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabValue>("general");
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleGeneralChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      general: { ...prev.general, [name]: value },
    }));
  };

  const handleAppearanceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [name]: value },
    }));
  };

  const handleAppearanceToggle = (
    name: keyof Settings["appearance"],
    checked: boolean
  ): void => {
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [name]: checked },
    }));
  };

  const handleSeoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: value },
    }));
  };

  const handleAdvancedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      advanced: { ...prev.advanced, [name]: value },
    }));
  };

  const handleSaveSettings = async (): Promise<void> => {
    try {
      setIsSaving(true);
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving settings:", settings);
      // Show success toast
    } catch (error) {
      console.error("Error saving settings:", error);
      // Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <Button
          onClick={handleSaveSettings}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="space-y-6"
      >
        <TabsList className="bg-gray-700 border-gray-600">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-purple-600"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="data-[state=active]:bg-purple-600"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="data-[state=active]:bg-purple-600"
          >
            SEO
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-purple-600"
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">General Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure basic settings for your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteTitle" className="text-white">
                  Site Title
                </Label>
                <Input
                  id="siteTitle"
                  name="siteTitle"
                  value={settings.general.siteTitle}
                  onChange={handleGeneralChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-white">
                  Site Description
                </Label>
                <Input
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={handleGeneralChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="favicon" className="text-white">
                    Favicon Path
                  </Label>
                  <Input
                    id="favicon"
                    name="favicon"
                    value={settings.general.favicon}
                    onChange={handleGeneralChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-white">
                    Logo Path
                  </Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={settings.general.logo}
                    onChange={handleGeneralChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Customize the look and feel of your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-white">
                    Theme
                  </Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(
                      value: "purple" | "blue" | "green" | "dark" | "light"
                    ) =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: value },
                      }))
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor" className="text-white">
                    Accent Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      name="accentColor"
                      value={settings.appearance.accentColor}
                      onChange={handleAppearanceChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <div
                      className="w-10 h-10 rounded-md border border-gray-600"
                      style={{
                        backgroundColor: settings.appearance.accentColor,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontFamily" className="text-white">
                  Font Family
                </Label>
                <Select
                  value={settings.appearance.fontFamily}
                  onValueChange={(value: string) =>
                    setSettings((prev) => ({
                      ...prev,
                      appearance: { ...prev.appearance, fontFamily: value },
                    }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableDarkMode" className="text-white">
                    Enable Dark Mode Toggle
                  </Label>
                  <Switch
                    id="enableDarkMode"
                    checked={settings.appearance.enableDarkMode}
                    onCheckedChange={(checked) =>
                      handleAppearanceToggle("enableDarkMode", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableAnimations" className="text-white">
                    Enable Animations
                  </Label>
                  <Switch
                    id="enableAnimations"
                    checked={settings.appearance.enableAnimations}
                    onCheckedChange={(checked) =>
                      handleAppearanceToggle("enableAnimations", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings Tab */}
        <TabsContent value="seo">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">SEO Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure search engine optimization settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-white">
                  Meta Title
                </Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={settings.seo.metaTitle}
                  onChange={handleSeoChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription" className="text-white">
                  Meta Description
                </Label>
                <Input
                  id="metaDescription"
                  name="metaDescription"
                  value={settings.seo.metaDescription}
                  onChange={handleSeoChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ogImage" className="text-white">
                  Open Graph Image Path
                </Label>
                <Input
                  id="ogImage"
                  name="ogImage"
                  value={settings.seo.ogImage}
                  onChange={handleSeoChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitterHandle" className="text-white">
                    Twitter Handle
                  </Label>
                  <Input
                    id="twitterHandle"
                    name="twitterHandle"
                    value={settings.seo.twitterHandle}
                    onChange={handleSeoChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId" className="text-white">
                    Google Analytics ID
                  </Label>
                  <Input
                    id="googleAnalyticsId"
                    name="googleAnalyticsId"
                    value={settings.seo.googleAnalyticsId}
                    onChange={handleSeoChange}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings Tab */}
        <TabsContent value="advanced">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Advanced Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure advanced settings for your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cacheControl" className="text-white">
                  Cache Control Header
                </Label>
                <Input
                  id="cacheControl"
                  name="cacheControl"
                  value={settings.advanced.cacheControl}
                  onChange={handleAdvancedChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="robotsTxt" className="text-white">
                  robots.txt Content
                </Label>
                <textarea
                  id="robotsTxt"
                  name="robotsTxt"
                  value={settings.advanced.robotsTxt}
                  onChange={handleAdvancedChange}
                  rows={4}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customCss" className="text-white">
                  Custom CSS
                </Label>
                <textarea
                  id="customCss"
                  name="customCss"
                  value={settings.advanced.customCss}
                  onChange={handleAdvancedChange}
                  rows={6}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white p-2 font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customJs" className="text-white">
                  Custom JavaScript
                </Label>
                <textarea
                  id="customJs"
                  name="customJs"
                  value={settings.advanced.customJs}
                  onChange={handleAdvancedChange}
                  rows={6}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white p-2 font-mono text-sm"
                  placeholder="// Add your custom JavaScript here"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 pt-6">
              <div className="text-sm text-gray-400">
                <p className="font-medium text-yellow-400 mb-1">Warning</p>
                <p>
                  Changes to these settings may affect your portfolio&#39;s
                  performance and functionality. Make sure you know what
                  you&#39;re doing before saving changes.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
