import { Button } from "@/components/ui/button";
import { Code, Book, Webhook, TestTube, ArrowRight } from "lucide-react";
import Link from "next/link";

const DeveloperSection = () => {
  const codeExample = `// Universal credential verification
const credential = await mocaPassport.verify({
  type: 'achievement',
  vertical: 'gaming',
  proof: zkProof
});

// Works across any industry
const healthCredential = await mocaPassport.verify({
  type: 'license',
  vertical: 'healthcare', 
  proof: medicalProof
});

// Real-time updates via webhooks
mocaPassport.webhooks.on('credential.verified', (event) => {
  console.log('New credential verified:', event.data);
});`;

  const developerFeatures = [
    {
      icon: Code,
      title: "RESTful APIs",
      description:
        "Comprehensive documentation with interactive examples and code snippets",
    },
    {
      icon: Book,
      title: "Multi-Language SDKs",
      description:
        "Native SDKs for JavaScript, Python, Go, Rust, and more languages",
    },
    {
      icon: Webhook,
      title: "Webhook System",
      description:
        "Real-time updates and event notifications for seamless integration",
    },
    {
      icon: TestTube,
      title: "Testing Sandbox",
      description:
        "Complete testing environment with mock data and simulation tools",
    },
  ];

  return (
    <section
      id="docs"
      className="section-padding mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <div className="container-responsive">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">Developer-First</span> Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by developers, for developers. Get up and running in minutes
            with our comprehensive tools and documentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Code Preview */}
          <div className="space-y-6">
            <div className="relative">
              <div className="bg-muted border border-border rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="ml-4 text-muted-foreground text-xs">
                    moca-passport-example.js
                  </span>
                </div>
                <pre className="text-foreground whitespace-pre-wrap">
                  <code>{codeExample}</code>
                </pre>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                TypeScript Ready
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold text-foreground">5min</div>
                <div className="text-sm text-muted-foreground">
                  Integration Time
                </div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">API Uptime</div>
              </div>
            </div>
          </div>

          {/* Developer Features */}
          <div className="space-y-8">
            <div className="space-y-6">
              {developerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all hover-lift"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 flex flex-col">
              <Link
                href="/docs"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-hero w-full">
                  Explore Documentation
                </Button>
              </Link>
              <Button variant="outline" className="btn-outline-hero w-full">
                Try Interactive Playground (Coming Soon)
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">50+</div>
                <div className="text-xs text-muted-foreground">
                  API Endpoints
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">8</div>
                <div className="text-xs text-muted-foreground">
                  Language SDKs
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
