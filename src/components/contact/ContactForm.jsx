import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Substitua a string abaixo pelo seu ID gerado no Formspree
  const FORMSPREE_ID = "xyezpdqr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: t("contact.successTitle") || "Mensagem enviada com sucesso",
          description: t("contact.successText") || "Recebi seus dados e retornarei o contato em breve.",
        });
        e.target.reset();
      } else {
        throw new Error("Falha no servidor de email");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("contact.errorTitle") || "Falha no envio",
        description: t("contact.errorText") || "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contact.name") || "Nome Completo"}</Label>
          <Input id="name" name="name" required placeholder="Ex: Carlos Silva" className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("contact.email") || "E-mail Corporativo"}</Label>
          <Input id="email" name="email" type="email" required placeholder="carlos@empresa.com" className="bg-background" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">{t("contact.subject") || "Assunto"}</Label>
        <Input id="subject" name="subject" required placeholder="Consultoria em S&OP / Governança" className="bg-background" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("contact.message") || "Mensagem"}</Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder="Descreva o seu desafio logístico, necessidade de análise de dados ou projeto..." 
          className="min-h-[160px] bg-background"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8">
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        {t("contact.send") || "Enviar Mensagem"}
      </Button>
    </form>
  );
}