import { Shield, Palette, Link2, Zap, Globe, Lock } from "lucide-react";

const PlatformFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy-Preserving",
      description: "Zero-knowledge proofs enable credential verification without exposing sensitive personal data, ensuring complete privacy protection.",
      benefits: ["Zero-knowledge verification", "Data sovereignty", "GDPR compliant"]
    },
    {
      icon: Palette,
      title: "Whitelabel Ready",
      description: "Complete customization engine allows instant branding and feature configuration for any industry or organization.",
      benefits: ["Custom branding", "Flexible UI/UX", "Industry-specific features"]
    },
    {
      icon: Link2,
      title: "Universal Integration",
      description: "Single API layer connects with any industry platform or existing system through our comprehensive integration framework.",
      benefits: ["RESTful APIs", "Webhook support", "Multi-platform SDKs"]
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Enterprise-grade infrastructure ensures sub-100ms response times with 99.9% uptime guarantee for mission-critical applications.",
      benefits: ["Sub-100ms latency", "99.9% uptime SLA", "Auto-scaling"]
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Built for worldwide deployment with multi-region support, CDN distribution, and compliance with international regulations.",
      benefits: ["Multi-region deployment", "Global CDN", "International compliance"]
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Military-grade encryption, multi-factor authentication, and comprehensive audit trails ensure maximum security for all credentials.",
      benefits: ["End-to-end encryption", "Multi-factor auth", "Comprehensive auditing"]
    }
  ];

  return (
    <section id="platform" className="section-padding bg-gradient-subtle mx-auto max-w-7xl px-6 py-24 sm:py-32 bg-gray-50">
      <div className="container-responsive">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for <span className="text-primary">Modern Identity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade infrastructure with developer-friendly APIs and complete customization control
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 hover:shadow-lg rounded-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary " />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Architecture Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Built on Proven Infrastructure
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging the Moca Stack for unparalleled performance and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">AIR Account Services</h4>
              <p className="text-sm text-muted-foreground">Secure account management</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">AIR Credential Services</h4>
              <p className="text-sm text-muted-foreground">Credential verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Link2 className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Moca Chain Integration</h4>
              <p className="text-sm text-muted-foreground">Blockchain verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Multi-Vertical APIs</h4>
              <p className="text-sm text-muted-foreground">Industry-specific endpoints</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;