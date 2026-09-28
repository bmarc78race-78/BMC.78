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
  const { toast, dismiss } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSPREE_ID = "xyezpdqr";

const handleSubmit = async (e) => {
  e.preventDefault();

  dismiss();
  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch(
      `https://formspree.io/f/${FORMSPREE_ID}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Formspree retornou HTTP ${response.status}`
      );
    }

    toast({
      title:
        t("contact.successTitle") ||
        "Mensagem enviada com sucesso",
      description:
        t("contact.successText") ||
        "Recebi seus dados e retornarei o contato em breve.",
      duration: 4000,
    });

    form.reset();
  } catch (error) {
    console.error(
      "Erro no envio do formulário:",
      error
    );

    toast({
      variant: "destructive",
      title:
        t("contact.errorTitle") ||
        "Falha no envio",
      description:
        t("contact.errorText") ||
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      duration: 5000,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      autoComplete="on"
    >
      {/* Honeypot anti-spam.
          Não remover e não alterar name="_gotcha". */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-gotcha">
          Leave this field empty
        </label>

        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Nome + E-mail */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            {t("contact.name") || "Nome Completo"}
          </Label>

          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Ex: Alberto Carvalho"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">
            {t("contact.email") || "E-mail Corporativo"}
          </Label>

          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="carlos@empresa.com"
            className="bg-background"
          />
        </div>
      </div>

      {/* Assunto */}
      <div className="space-y-2">
        <Label htmlFor="contact-subject">
          {t("contact.subject") || "Assunto"}
        </Label>

        <Input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={160}
          autoComplete="off"
          placeholder="Consultoria em S&OP / Governança"
          className="bg-background"
        />
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="contact-message">
          {t("contact.message") || "Mensagem"}
        </Label>

        <Textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          autoComplete="off"
          placeholder="Descreva o seu desafio logístico, necessidade de análise de dados ou projeto..."
          className="min-h-[160px] bg-background"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 md:w-auto"
      >
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